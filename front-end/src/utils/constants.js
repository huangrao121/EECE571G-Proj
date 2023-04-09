import Crowdfunding from "./abi/Crowdfunding.json";
import Cfmanagement from "./abi/Cfmanagement.json";
import CF from "./abi/CF.json";

const CONTRACT_ADDRESS = "0x1ca5bC29e564C9b83B743F6D9626d4285e107B7D";

export const CrowdfundingInfo = {
    address: CONTRACT_ADDRESS,
    abi: Crowdfunding.abi,
};

export const CfmanagementInfo = {
    address: CONTRACT_ADDRESS,
    abi: Cfmanagement.abi,
};

export const CfInfo = {
    address: CONTRACT_ADDRESS,
    abi: CF.abi,
}