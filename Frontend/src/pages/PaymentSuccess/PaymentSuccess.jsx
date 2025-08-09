import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(StoreContext);

  useEffect(() => {
    // Clear cart when payment success page is accessed
    clearCart();
  }, [clearCart]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/myorders");
  };

  return (
    <div className='payment-success'>
      <div className="payment-success-container">
        <div className="payment-success-card">
          <div className="payment-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          
          <h1 className="payment-success-title">Payment Successful!</h1>
          <p className="payment-success-subtitle">
            Thank you for your order! Your payment has been processed successfully. 
            We're preparing your delicious food and will deliver it to you soon.
          </p>

          <div className="payment-success-order-details">
            <div className="payment-success-order-id">Order ID</div>
            <div className="payment-success-order-number">#TEST-ORDER-123</div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)', 
              marginTop: '0.5rem',
              fontStyle: 'italic'
            }}>
              (Test Mode - No Real Payment)
            </div>
          </div>

          <div className="payment-success-features">
            <div className="payment-success-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Order confirmed and being prepared</span>
            </div>
            <div className="payment-success-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>30-minute delivery guarantee</span>
            </div>
            <div className="payment-success-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Real-time order tracking available</span>
            </div>
          </div>

          <div className="payment-success-actions">
            <button onClick={handleGoHome} className="payment-success-btn payment-success-btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Go Home
            </button>
            
            <button onClick={handleViewOrders} className="payment-success-btn payment-success-btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
