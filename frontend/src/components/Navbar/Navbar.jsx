import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export function Navbar() {
  return (
    <nav className='nav--container'>
            <h1> F1 stats</h1>
        <div className='nav--links--container'>
            <Link to="/" className='nav--link'>Home</Link>
            <Link to="/drivers" className='nav--link'>Drivers</Link>
            <Link to="/seasons_drivers_standings" className='nav--link'>Drivers Standings</Link>
        </div>
    </nav>
  )
}