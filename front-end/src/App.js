import './App.css';
import Navigator from './components/navigator/navigator'
import Create from './components/create/create'
import Display from './components/display/display'
import { Route,Switch } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { CfmanagementInfo, CrowdfundingInfo } from "./utils/constants"
import { CrowdfundingProvider } from './contexts/crowdfunding_context';

function App() {
  const [cfmanagement, setCfmanagement] = useState();
  const [crowdfundings, setCrowdfundings] = useState([]);
  const [cfsAddress, setCfsAddress] = useState([]);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();

  // useEffect(() => {
  //   const initCfmanagement = async () => {
  //     const _provider = new ethers.providers.Web3Provider(
  //       window.ethereum,
  //       "any"
  //     );
  //     await _provider.send("eth_requestAccounts", []);
  //     const _signer = _provider.getSigner();
  //     // get the contract instance
  //     const _cfmanagement = new ethers.Contract(
  //       CfmanagementInfo.address,
  //       CfmanagementInfo.abi,
  //       _signer
  //     );

  //     if (!provider) {
  //       setProvider(_provider);
  //     }
  //     if (!signer) {
  //       setSigner(_signer);
  //     }
  //     if (cfmanagement?.address !== _cfmanagement.address) {
  //       setCfmanagement(_cfmanagement);
  //     }

  //     console.log("Provider: ", provider);
  //     console.log("Signer: ",signer);
  //   };
  //   initCfmanagement();
  // }, [provider, cfmanagement, signer]);

  // useEffect(()=>{
  //   const initCrowdfundingAddress = async() =>{
  //   if(!cfmanagement){
  //     return;
  //   }  
  //   const _cfsAddress = cfmanagement.getAllCrowdFundings();
  //   if(!JSON.stringify(_cfsAddress) === JSON.stringify(cfsAddress)){
  //     setCfsAddress(_cfsAddress);
  //   }
  // };
  // initCrowdfundingAddress();
  // }, [cfmanagement, cfsAddress]);

  // useEffect(()=>{
  //   const initCrowdfundings = async () => {
  //     if(!cfsAddress || cfsAddress.length === 0){
  //       return;
  //     }

  //     const _crowdfundings = [];
  //     const createCrowdfunding = (address) => {
  //       const contract = new ethers.Contract(address, CrowdfundingInfo.abi, signer);
  //       // return contract.title().then((t) => {
  //       //   contract.owner().then((o) => {
  //       //     contract.active().then((a) => {
  //       //       if (a) {
  //       //         _crowdfundings.push(new Crowdfunding(address, contract, t, o));
  //       //         setCrowdfundings([..._crowdfundings]);
  //       //       }
  //       //     });
  //       //   });
  //       // });
  //     };

  //     cfsAddress.map(createCrowdfunding);
  //   };

  //   initCrowdfundings();
  // }, [cfsAddress, signer]);

  return (
    <CrowdfundingProvider>
      <div className="App">
        <Navigator/>
        <Switch>
          <Route path="/createNewProj" component={Create}/>
          <Route path="/" component={Display}/>
        </Switch>
      </div>
    </CrowdfundingProvider>
  );
}

export default App;
