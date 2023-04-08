// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./crowdfunding.sol";

contract Cfmanagement{
    address payable public owner;
    Crowdfunding[] public Cfs;
    constructor(){
        owner = payable(msg.sender);
    }

    function createCrowdFunding(string memory title, uint256 duration, uint256 goal, uint min, string memory descript) public payable{
        require(msg.value >= 2, "Not enough deposit");
        Crowdfunding cf = new Crowdfunding(title,duration,goal,min,descript);
        Cfs.push(cf);
    }
    
    function getContractCount() public view returns(uint contractCount){
        return Cfs.length;
    }
}