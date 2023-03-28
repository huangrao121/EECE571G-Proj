import React, { Component } from 'react'
import './index.css'
export default class Search extends Component {
  render() {
    return (
      <div className='col-4 search'>
        <form class="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    )
  }
}
