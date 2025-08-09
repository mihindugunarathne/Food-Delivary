import React from 'react'
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Dashboard</h2>
        <p className="sidebar-subtitle">Manage your restaurant</p>
      </div>
      
      <div className="sidebar-options">
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Menu Management</h3>
          
          <NavLink to='/add' className="sidebar-option">
            <div className="sidebar-option-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <span className="sidebar-option-text">Add Items</span>
          </NavLink>
          
          <NavLink to='/list' className="sidebar-option">
            <div className="sidebar-option-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <span className="sidebar-option-text">Menu Items</span>
          </NavLink>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Orders</h3>
          
          <NavLink to='/orders' className="sidebar-option">
            <div className="sidebar-option-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <span className="sidebar-option-text">Order Management</span>
            <span className="sidebar-option-badge">3</span>
          </NavLink>
        </div>
      </div>
      
      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <div className="sidebar-footer-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="sidebar-footer-text">
            <div className="sidebar-footer-title">Need Help?</div>
            <div className="sidebar-footer-subtitle">Contact support</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar