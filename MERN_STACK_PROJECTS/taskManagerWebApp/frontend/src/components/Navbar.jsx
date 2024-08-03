import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ mode,toggle,modeText }) {
  return (
    <nav 
    className={`navbar bg-${mode} text-${mode == 'light' ? 'black' : 'white'} navbar-expand-lg data-bs-theme=${mode}`}>
      <div className="container-fluid">
        <a className={`navbar-brand text-${mode == 'light' ? 'black' : 'white'}`} href="/">TaskManager</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link text-${mode == 'light' ? 'black' : 'white'}`} to='/'>Home</Link>
            </li>
          </ul>
        </div>
          <div className="form-check form-switch">
            <input className="form-check-input" onClick={toggle} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable {modeText}</label>
          </div>
      </div>
    </nav>
  )
}
