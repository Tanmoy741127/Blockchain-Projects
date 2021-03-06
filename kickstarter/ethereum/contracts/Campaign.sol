// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }


}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address receipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    mapping (uint => Request) public requests;
    uint numRequests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
        numRequests=0;
        approversCount=0;
    }

    function contribute()public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory  description, uint value, address receipient) restricted public {
        Request storage newRequest = requests[numRequests++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.receipient = receipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index)public restricted{
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        payable(request.receipient).transfer(request.value);
        request.complete = true;
    }
}