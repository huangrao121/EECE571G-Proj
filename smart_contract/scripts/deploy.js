const hre = require("hardhat");

async function main() {
  const campaignTitle = "Sample Crowdfunding Campaign";
  const duration = 30 * 24 * 60 * 60; // 30 days in seconds
  const goal = hre.ethers.utils.parseEther("10"); // 10 Ether

  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(campaignTitle, duration, goal);

  await crowdfunding.deployed();

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
