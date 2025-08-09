import React from 'react'
import "./Orders.css";

const Orders = () => {
  return (
    <div className="orders">
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">Order Management</h1>
          <p className="orders-subtitle">Track and manage customer orders</p>
        </div>

        <div className="orders-content">
          <div className="orders-empty">
            <div className="orders-empty-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <div className="orders-empty-title">No orders yet</div>
            <div className="orders-empty-subtitle">Orders will appear here when customers place them</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders