import React, { Component} from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
// import { connectWallet } from '../../utils/interact'
import { CrowdfundingContext } from '../../contexts/crowdfunding_context'

// const connectPressed = async () =>{
//     const connectWallet = useContext(CrowdfundingContext);
//     const walletResponse = await connectWallet();
//     console.log(walletResponse)
// }

export default class navigator extends Component {

  static contextType = CrowdfundingContext;

  render() {
    const { connectWallet } = this.context; 
    // console.log(this.context);

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
          <div>
            <button className='btn btn-success' onClick={connectWallet}>Connect</button>
            <NavLink to="/createNewProj">
              <button className='btn btn-outline-success ms-2'>Launch</button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}
