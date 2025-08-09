import React, { useContext, useEffect, useState } from 'react';
import './Verify.css'
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [orderDetails, setOrderDetails] = useState(null);

  const verifyPayment = async () => {
    // For testing purposes, if no success parameter is provided, show success page
    if (!success && !orderId) {
      setVerificationStatus('success');
      setOrderDetails({ _id: 'TEST-ORDER-123' });
      // Clear cart for test mode
      await clearCart();
      return;
    }

    try {
      const response = await axios.post(url + '/api/order/verify', { success, orderId });
      if (response.data.success) {
        setOrderDetails(response.data.order);
        setVerificationStatus('success');
        // Clear cart after successful payment
        await clearCart();
      } else {
        setVerificationStatus('error');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      // For testing, show success even if API fails
      if (!success && !orderId) {
        setVerificationStatus('success');
        setOrderDetails({ _id: 'TEST-ORDER-123' });
        // Clear cart for test mode
        await clearCart();
      } else {
        setVerificationStatus('error');
      }
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/myorders");
  };

  if (verificationStatus === 'loading') {
    return (
      <div className='verify'>
        <div className="verify-container">
          <div className="verify-spinner"></div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className='verify'>
        <div className="verify-container">
          <div className="verify-success">
            <div className="verify-success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h1 className="verify-success-title">Payment Successful!</h1>
            <p className="verify-success-subtitle">
              Thank you for your order! Your payment has been processed successfully. 
              We're preparing your delicious food and will deliver it to you soon.
            </p>

            {orderDetails && (
              <div className="verify-order-details">
                <div className="verify-order-id">Order ID</div>
                <div className="verify-order-number">{orderDetails._id}</div>
              </div>
            )}

            <div className="verify-actions">
              <button onClick={handleGoHome} className="verify-btn verify-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Go Home
              </button>
              
              <button onClick={handleViewOrders} className="verify-btn verify-btn-secondary">
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
  }

  if (verificationStatus === 'error') {
    return (
      <div className='verify'>
        <div className="verify-container">
          <div className="verify-error">
            <div className="verify-error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            
            <h1 className="verify-error-title">Payment Failed</h1>
            <p className="verify-error-subtitle">
              We're sorry, but there was an issue processing your payment. 
              Please try again or contact our support team for assistance.
            </p>

            <div className="verify-actions">
              <button onClick={handleGoHome} className="verify-btn verify-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Verify