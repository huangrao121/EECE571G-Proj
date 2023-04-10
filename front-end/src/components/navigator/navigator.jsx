import React, { Component, useContext, useEffect, useState} from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
// import { connectWallet } from '../../utils/interact'
import { CrowdfundingContext } from '../../contexts/crowdfunding_context'


// export default class navigator extends Component {

//   static contextType = CrowdfundingContext;

//   constructor(props) {
//     super(props);
//     this.state = {
//       wallet: ""
//     };
//   }

//   render() {
//     const { connectWallet } = this.context; 
//     // console.log(this.context);

//     return (
//       <div className='navbar navigator'>
//         <div className='container'>
//           <div className='logo'>
//           <a className='align-items-center mb-2 mb-lg-0 text-dark text-decoration-none' href="/">
//             CROWDFUNDING
//           </a>
//           </div>
//           <div className='col-4 search'>
//             <form className="d-flex">
//               <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
//               <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//           </div>
//           <div>
//             <button className='btn btn-success' onClick={connectWallet}>Connect</button>
//             <NavLink to="/createNewProj">
//               <button className='btn btn-outline-success ms-2'>Launch</button>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

const Navigator = () => {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const { connectWallet, getCurrentWalletConnected } = useContext(CrowdfundingContext);

  useEffect(()=>{
    async function init(){
      const { address, status } = await getCurrentWalletConnected();
			setWallet(address);
			setStatus(status);
			addWalletListener();
			addSmartContractListener();
    }
    init();
  }, [walletAddress, getCurrentWalletConnected]);

  function addSmartContractListener(){

  }

  function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
					setStatus(
						"👆🏽 input the transfer to addresst in the text-field above."
					);
				} else {
					setWallet("");
					setStatus("🦊 Connect to Metamask using the top right button.");
				}
			});
		} else {
			setStatus(
				<p>
					{" "}
					🦊{" "}
					<a target="_blank" href={`https://metamask.io/download.html`}>
						You must install Metamask, a virtual Ethereum wallet, in your
						browser.
					</a>
				</p>
			);
		}
	}

  return (
    <div className='navbar navigator'>
      <div className='container'>
        <div className='logo'>
        <a className='align-items-center mb-2 mb-lg-0 text-dark text-decoration-none' href="/">
          CROWDFUNDING
        </a>
        </div>
        <div className='col-4 search'>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <div >{walletAddress==="" ? "" : walletAddress.slice(0,20)+"..."}</div>
        <div>
          <button className='btn btn-success' onClick={connectWallet}>Connect</button>
          <NavLink to="/createNewProj">
            <button className='btn btn-outline-success ms-2'>Launch</button>
          </NavLink>
        </div>
      </div>
    </div>
  );

};

export default Navigator;
