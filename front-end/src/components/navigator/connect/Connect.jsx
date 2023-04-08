import React, { Component } from 'react'
import { connectWallet } from '../../../utils/interact';

const connectPressed = async () =>{
  const walletResponse = await connectWallet();
  console.log(walletResponse)

}

export default class Connect extends Component {
  render() {
    return (
      <div >
        <button className='btn btn-success' onClick={connectPressed}>Connect</button>
      </div>
    )
  }
}
