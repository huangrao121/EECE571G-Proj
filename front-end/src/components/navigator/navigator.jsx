import React, { Component } from 'react'
import Logo from './logo/logo'
import Search from './search/Search'
import Connect from './connect/Connect'
import './index.css'
export default class navigator extends Component {
  render() {
    return (
      <div className='navbar navigator'>
        <div className='container'>
          <Logo/>
          <Search/>
          <Connect/>
        </div>
      </div>
    )
  }
}
