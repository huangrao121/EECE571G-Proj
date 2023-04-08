const hre = require("hardhat");

async function main() {
  const campaignTitle = "Sample Crowdfunding Campaign";
  const duration = 30 * 24 * 60 * 60; // 30 days in seconds
  const goal = hre.ethers.utils.parseEther("10"); // 10 Ether
  const min = 0;
  const description = "Crowdfunding";

  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(campaignTitle, duration, goal, min, description);

  await crowdfunding.deployed();

  console.log("Contract deployed to address: ", crowdfunding.address);

  console.log(
    `Crowdfunding campaign "${campaignTitle}" with goal ${ethers.utils.formatEther(
      goal
    )}ETH and duration ${duration} seconds deployed to ${crowdfunding.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
