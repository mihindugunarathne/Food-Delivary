import React from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <img className='logo' src={assets.logo} alt="Food Dev Logo" />
        <h1 className="navbar-title">Admin Panel</h1>
      </div>
      
      <div className="navbar-actions">
        <div className="notification-badge" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="m13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
        
        <div className="profile-container">
          <img className='profile' src={assets.profile_image} alt="Admin Profile" />
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar