import React, { Component } from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'
export default class navigator extends Component {
  render() {
    return (
      <div className='navbar navigator'>
        <div className='container'>
          <div className='logo'>
          <a className='align-items-center mb-2 mb-lg-0 text-dark text-decoration-none' href="/">LOGO</a>
          </div>
          <div className='col-4 search'>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
          <div>
            <button className='btn btn-success'>Connect</button>
            <NavLink to="/createNewProj">
              <button className='btn btn-outline-success ms-2'>Launch</button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}
