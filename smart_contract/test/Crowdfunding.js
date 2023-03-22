const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;
const { advanceTimeAndBlock } = require("./utils/time");

describe("Crowdfunding", function () {
  let Crowdfunding, crowdfunding, owner, contributor1, contributor2;

  const DURATION = 30 * 24 * 60 * 60; // 30 days in seconds
  const GOAL_AMOUNT = parseEther("10");
  const CONTRIBUTION1 = parseEther("2");
  const CONTRIBUTION2 = parseEther("3");

  beforeEach(async function () {
    const campaignTitle = "Sample Crowdfunding Campaign";

    Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.deploy(campaignTitle, DURATION, GOAL_AMOUNT);
    await crowdfunding.deployed();

    [owner, contributor1, contributor2, _] = await ethers.getSigners();
  });

  describe("contribute", function () {
    it("should accept contributions", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      expect(await crowdfunding.contributions(contributor1.address)).to.equal(CONTRIBUTION1);
      expect(await crowdfunding.totalRaised()).to.equal(CONTRIBUTION1);
    });
  });

  describe("withdraw", function () {
    beforeEach(async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      await contributor2.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION2 });
    });

    it("should not allow withdrawal if goal not reached", async function () {
      await expect(crowdfunding.connect(owner).withdraw()).to.be.revertedWith("Goal not reached.");
    });

    it("should allow withdrawal if goal reached", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: GOAL_AMOUNT });
      await advanceTimeAndBlock(ethers.provider, DURATION + 1);
      const initialBalance = await owner.getBalance();
      const tx = await crowdfunding.connect(owner).withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      const gasPrice = tx.gasPrice;
      const gasCost = gasUsed.mul(gasPrice);
      const finalBalance = await owner.getBalance();
      const totalContributions = CONTRIBUTION1.add(CONTRIBUTION2).add(GOAL_AMOUNT);
      const expectedBalance = initialBalance.add(totalContributions).sub(gasCost);
    
      expect(parseFloat(ethers.utils.formatEther(finalBalance))).to.be.closeTo(
        parseFloat(ethers.utils.formatEther(expectedBalance)),
        0.0001
      );
    });   
  });

  describe("refund", function () {
    beforeEach(async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      await contributor2.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION2 });
      await advanceTimeAndBlock(ethers.provider, DURATION + 1);
    });

    it("should refund contributions if goal not reached", async function () {
      const initialBalance = await contributor1.getBalance();
      const tx = await crowdfunding.connect(contributor1).refund();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      const gasPrice = tx.gasPrice;
      const gasCost = gasUsed.mul(gasPrice);
      const finalBalance = await contributor1.getBalance();
      const expectedBalance = initialBalance.add(CONTRIBUTION1).sub(gasCost);

      expect(finalBalance).to.equal(expectedBalance);
      expect(await crowdfunding.contributions(contributor1.address)).to.equal(0);
    });
    it("should not allow refunds if goal reached", async function () {
      // Deploy a new instance of the crowdfunding contract with a shorter duration
      const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
      const DURATION = 24 * 60 * 60; // 24 hours
      const campaignTitle = "Sample Crowdfunding Campaign";
      const newCrowdfunding = await Crowdfunding.deploy(campaignTitle, DURATION, GOAL_AMOUNT);
    
      await newCrowdfunding.deployed();
    
      await contributor1.sendTransaction({ to: newCrowdfunding.address, value: GOAL_AMOUNT });
    
      // Increase the block time to close the crowdfunding
      const provider = ethers.provider;
      const currentTime = (await provider.getBlock()).timestamp;
      const timeToAdvance = DURATION + 1;
      await provider.send("evm_increaseTime", [timeToAdvance]);
      await provider.send("evm_mine");
    
      await expect(newCrowdfunding.connect(contributor1).refund()).to.be.revertedWith("Goal reached, cannot refund.");
    });   
  });
  
  describe("getContributors", function () {
    it("should return an empty array when no contributors", async function () {
      const contributorsArray = await crowdfunding.getContributors();
      expect(contributorsArray.length).to.equal(0);
    });
  
    it("should return an array with correct contributors", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      await contributor2.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION2 });
  
      const contributorsArray = await crowdfunding.getContributors();
      expect(contributorsArray.length).to.equal(2);
      expect(contributorsArray).to.include(contributor1.address);
      expect(contributorsArray).to.include(contributor2.address);
    });
  });
  
  describe("getTotalContributors", function () {
    it("should return 0 when no contributors", async function () {
      const totalContributors = await crowdfunding.getTotalContributors();
      expect(totalContributors).to.equal(0);
    });
  
    it("should return the correct number of contributors", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      await contributor2.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION2 });
  
      const totalContributors = await crowdfunding.getTotalContributors();
      expect(totalContributors).to.equal(2);
    });
  });
  
  describe("isCampaignSuccessful", function () {
    it("should return false when the goal is not reached", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION1 });
      await contributor2.sendTransaction({ to: crowdfunding.address, value: CONTRIBUTION2 });
  
      const isCampaignSuccessful = await crowdfunding.isCampaignSuccessful();
      expect(isCampaignSuccessful).to.be.false;
    });
  
    it("should return true when the goal is reached", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: GOAL_AMOUNT });
  
      const isCampaignSuccessful = await crowdfunding.isCampaignSuccessful();
      expect(isCampaignSuccessful).to.be.true;
    });
  });  
  describe("getRemainingTime", function () {
    it("should return the remaining time", async function () {
      const secondsToAdvance = 10;
      await advanceTimeAndBlock(ethers.provider, secondsToAdvance);
  
      const remainingTime = await crowdfunding.getRemainingTime();
      const lowerBound = DURATION - 5 - secondsToAdvance;
      const upperBound = DURATION + 5 - secondsToAdvance;
      expect(remainingTime).to.be.within(lowerBound, upperBound); // Allow 5 seconds of tolerance
    });
  });
  
  describe("isContributor", function () {
    it("should return false for non-contributors", async function () {
      const isContributor = await crowdfunding.isContributor(contributor1.address);
      expect(isContributor).to.be.false;
    });
  
    it("should return true for contributors", async function () {
      await contributor1.sendTransaction({ to: crowdfunding.address, value: parseEther("1") });
      const isContributor = await crowdfunding.isContributor(contributor1.address);
      expect(isContributor).to.be.true;
    });
  });
  
  describe("getContribution", function () {
    it("should return the correct contribution amount", async function () {
      const contributionAmount = parseEther("1");
      await contributor1.sendTransaction({ to: crowdfunding.address, value: contributionAmount });
  
      const contributedAmount = await crowdfunding.getContribution(contributor1.address);
      expect(contributedAmount).to.equal(contributionAmount);
    });
  });
  
});

