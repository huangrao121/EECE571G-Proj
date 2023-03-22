// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address payable public owner;
    uint256 public endTime;
    uint256 public goalAmount;
    uint256 public totalRaised;
    mapping(address => uint256) public contributions;

    constructor(uint256 duration, uint256 goal) {
        owner = payable(msg.sender);
        endTime = block.timestamp + duration;
        goalAmount = goal;
    }

    receive() external payable {
        require(block.timestamp < endTime, "Crowdfunding is closed.");
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
}
