import React, { useState } from "react";
import { ethers } from "ethers";
import { CrowdfundingInfo } from "../utils/constants";
import { CfmanagementInfo } from "../utils/constants";

export const CrowdfundingContext = React.createContext();

// const getCrowdfundingContract = () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const singer = provider.getSigner();
//     const crowdfundingContract = new ethers.Contract(CrowdfundingInfo.address, CrowdfundingInfo.abi, singer);

//     console.log(
//         provider,
//         singer,
//         crowdfundingContract
//     )
// };


export const CrowdfundingProvider = ({children}) => {

    const getCfmanagementContract = () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      const singer = provider.getSigner();
      const cfmanagementContract = new ethers.Contract(CfmanagementInfo.address, CfmanagementInfo.abi, singer);

      // console.log(
      //     provider,
      //     singer,
      //     cfmanagementContract
      // )

      return cfmanagementContract;
    };

    const connectWallet = async () => {
        if (window.ethereum) {
          console.log("Metamask detected");
          try {
            const addressArray = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const obj = {
              status: "😆 connected to metamask wallet successfully.",
              address: addressArray[0],
            };
            return obj;
          } catch (err) {
            return {
              address: "",
              status: "😥 " + err.message,
            };
          }
        } else {
          console.log("Metamask not detected");
          return {
            address: "",
            status: (
              <span>
                <p>
                  {" "}
                  🦊{" "}
                  <a target="_blank" href={`https://metamask.io/download.html`}>
                    You must install Metamask, a virtual Ethereum wallet, in your
                    browser.
                  </a>
                </p>
              </span>
            ),
          };
        }
        
    };

   const getCurrentWalletConnected = async () => {
      if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (addressArray.length > 0) {
            return {
              address: addressArray[0],
              status: "👆🏽 input the transfer to addresst in the text-field above.",
            };
          } else {
            return {
              address: "",
              status: "🦊 Connect to Metamask using the top right button.",
            };
          }
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          ),
        };
      }
    };

    return (
        <CrowdfundingContext.Provider value={{connectWallet, getCurrentWalletConnected, getCfmanagementContract}}>
            {children}
        </CrowdfundingContext.Provider>
    );
};