// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address payable public owner;
    string public campaignTitle;
    uint256 public endTime;
    uint256 public goalAmount;
    uint256 public totalRaised;
    mapping(address => uint256) public contributions;
    address[] private contributorsArray;

    constructor(string memory title, uint256 duration, uint256 goal) {
        owner = payable(msg.sender);
        campaignTitle = title;
        endTime = block.timestamp + duration;
        goalAmount = goal;
    }

    receive() external payable {
        require(block.timestamp < endTime, "Crowdfunding is closed.");
        if (contributions[msg.sender] == 0) {
            contributorsArray.push(msg.sender);
        }
        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw.");
        require(totalRaised >= goalAmount, "Goal not reached.");
        owner.transfer(address(this).balance);
    }

    function refund() external {
        require(block.timestamp > endTime, "Crowdfunding is still open.");
        require(totalRaised < goalAmount, "Goal reached, cannot refund.");
        uint256 amountToRefund = contributions[msg.sender];
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amountToRefund);
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= endTime) {
            return 0;
        }
        return endTime - block.timestamp;
    }

    function isContributor(address contributor) public view returns (bool) {
        return contributions[contributor] > 0;
    }

    function getContribution(address contributor) public view returns (uint256) {
        return contributions[contributor];
    }

    function getContributors() public view returns (address[] memory) {
        return contributorsArray;
    }

    function getTotalContributors() public view returns (uint256) {
        return contributorsArray.length;
    }

    function isCampaignSuccessful() public view returns (bool) {
        return totalRaised >= goalAmount;
    }
}
