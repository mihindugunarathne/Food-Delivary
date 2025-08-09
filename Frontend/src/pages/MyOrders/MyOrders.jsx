import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleTrackOrder = (orderId) => {
    // TODO: Implement order tracking functionality
    console.log('Track order:', orderId);
  };

  const handleReorder = (order) => {
    // TODO: Implement reorder functionality
    console.log('Reorder:', order);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'confirmed':
        return 'confirmed';
      case 'delivered':
        return 'delivered';
      default:
        return 'pending';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className='myorders'>
        <div className="myorders-container">
          <div className="myorders-loading">
            <div className="loading"></div>
            <span>Loading your orders...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className='myorders'>
        <div className="myorders-container">
          <div className="myorders-empty">
            <div className="myorders-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="myorders-empty-title">Please Login</h2>
            <p className="myorders-empty-subtitle">
              You need to be logged in to view your orders.
            </p>
            <button onClick={() => navigate('/')} className="myorders-empty-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='myorders'>
        <div className="myorders-container">
          <div className="myorders-header">
            <h1 className="myorders-title">My Orders</h1>
            <p className="myorders-subtitle">Track your food delivery orders</p>
          </div>
          
          <div className="myorders-empty">
            <div className="myorders-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </div>
            <h2 className="myorders-empty-title">No Orders Yet</h2>
            <p className="myorders-empty-subtitle">
              You haven't placed any orders yet. Start exploring our delicious menu!
            </p>
            <button onClick={() => navigate('/')} className="myorders-empty-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='myorders'>
      <div className="myorders-container">
        <div className="myorders-header">
          <h1 className="myorders-title">My Orders</h1>
          <p className="myorders-subtitle">Track your food delivery orders</p>
        </div>
        
        <div className="myorders-content">
          {data.map((order, index) => (
            <div key={order._id || index} className="myorders-order">
              <div className="myorders-order-header">
                <div className="myorders-order-id">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  Order #{order._id?.slice(-8) || 'N/A'}
                </div>
                <div className={`myorders-order-status ${getStatusColor(order.status)}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {order.status || 'Pending'}
                </div>
              </div>
              
              <div className="myorders-order-content">
                <div className="myorders-order-items">
                  {order.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="myorders-order-item">
                      <img
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                        className="myorders-order-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=Food';
                        }}
                      />
                      <div className="myorders-order-item-details">
                        <div className="myorders-order-item-name">{item.name}</div>
                        <div className="myorders-order-item-quantity">Quantity: {item.quantity}</div>
                      </div>
                      <div className="myorders-order-item-price">${item.price}</div>
                    </div>
                  ))}
                </div>
                
                <div className="myorders-order-summary">
                  <div className="myorders-order-summary-row">
                    <span className="myorders-order-summary-label">Order Date</span>
                    <span className="myorders-order-summary-value">
                      {formatDate(order.createdAt || new Date())}
                    </span>
                  </div>
                  <div className="myorders-order-summary-row">
                    <span className="myorders-order-summary-label">Items</span>
                    <span className="myorders-order-summary-value">{order.items?.length || 0}</span>
                  </div>
                  <div className="myorders-order-summary-row">
                    <span className="myorders-order-summary-label">Total Amount</span>
                    <span className="myorders-order-summary-value">${order.amount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
                
                <div className="myorders-order-actions">
                  <button
                    onClick={() => handleReorder(order)}
                    className="myorders-order-btn myorders-order-btn-secondary"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="M18.36 11.64a9 9 0 1 1-12.73 0L12 2l6.36 9.64Z"></path>
                    </svg>
                    Reorder
                  </button>
                  <button
                    onClick={() => handleTrackOrder(order._id)}
                    className="myorders-order-btn myorders-order-btn-primary"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9H9l-3-9H2"></path>
                      <path d="M5.45 5.11L2 12h6a2 2 0 0 1 2 2v1.82a5 5 0 0 0 2.47 1.64L11.89 22h2.67l1.42-6.54A5 5 0 0 0 18.31 16H22l-3.45-6.89z"></path>
                    </svg>
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;