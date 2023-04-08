// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CF{
  struct cf{
    address payable owner;
    string campaignTitle;
    uint256 endTime;
    uint256 goalAmount;
    uint256 totalRaised;
    mapping(address => uint256) contributions;
    address[] contributorsArray;
  }
}