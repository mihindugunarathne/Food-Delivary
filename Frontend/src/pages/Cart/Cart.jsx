import React, { useContext, useState } from 'react'
import './Cart.css';
import {StoreContext} from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url} = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const navigate = useNavigate();
  
  const deliveryFee = getTotalCartAmount() > 0 ? 2 : 0;
  const totalAmount = getTotalCartAmount() + deliveryFee;
  
  const cartItemsList = food_list.filter(item => cartItems[item._id] > 0);
  
  const handlePromoSubmit = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      // Here you would typically validate the promo code with your backend
    }
  };
  
  const handleCheckout = () => {
    if (cartItemsList.length > 0) {
      navigate('/order');
    }
  };

  if (cartItemsList.length === 0) {
    return (
      <div className='cart'>
        <div className="cart-container">
          <div className="cart-header">
            <h1 className="cart-title">Your Cart</h1>
            <p className="cart-subtitle">Add some delicious items to get started</p>
          </div>
          
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div className="cart-empty-title">Your cart is empty</div>
            <div className="cart-empty-subtitle">
              Looks like you haven't added any items to your cart yet. 
              Browse our menu and add some delicious food!
            </div>
            <a href="/" className="cart-empty-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <path d="M20.2 20.2c2.04-2.03 4.8-8.2 4.8-11.2 0-6.5-4.2-9-9-9s-9 2.5-9 9c0 3 2.76 9.17 4.8 11.2"></path>
              </svg>
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">
            {cartItemsList.length} {cartItemsList.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2 className="cart-items-header-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Cart Items
              </h2>
            </div>
            
            <div className="cart-items-list">
              {cartItemsList.map((item) => (
                <div key={item._id} className="cart-item">
                  <img 
                    src={url + "/images/" + item.image} 
                    alt={item.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                  </div>
                  
                  <div className="cart-item-price">{item.price}</div>
                  
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-item-quantity-btn"
                      onClick={() => removeFromCart(item._id)}
                      title="Decrease quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <span className="cart-item-quantity-value">{cartItems[item._id]}</span>
                    <button 
                      className="cart-item-quantity-btn"
                      onClick={() => addToCart(item._id)}
                      title="Increase quantity"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="cart-item-total">{(item.price * cartItems[item._id]).toFixed(2)}</div>
                  
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item._id)}
                    title="Remove item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="cart-summary">
            <div className="cart-summary-header">
              <h2 className="cart-summary-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9H9l-3-9H2"></path>
                  <path d="M5.45 5.11L2 12h6a2 2 0 0 1 2 2v1.82a5 5 0 0 0 2.47 1.64L11.89 22h2.67l1.42-6.54A5 5 0 0 0 18.31 16H22l-3.45-6.89z"></path>
                </svg>
                Order Summary
              </h2>
            </div>
            
            <div className="cart-summary-content">
              <div className="cart-summary-row">
                <span className="cart-summary-label">Subtotal</span>
                <span className="cart-summary-value">${getTotalCartAmount().toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-row">
                <span className="cart-summary-label">Delivery Fee</span>
                <span className="cart-summary-value">${deliveryFee.toFixed(2)}</span>
              </div>
              
              {promoApplied && (
                <div className="cart-summary-row">
                  <span className="cart-summary-label">Promo Discount</span>
                  <span className="cart-summary-value" style={{color: 'var(--success-color)'}}>-${(totalAmount * 0.1).toFixed(2)}</span>
                </div>
              )}
              
              <div className="cart-summary-row">
                <span className="cart-summary-label">Total</span>
                <span className="cart-summary-value">
                  ${promoApplied ? (totalAmount * 0.9).toFixed(2) : totalAmount.toFixed(2)}
                </span>
              </div>
              
              <button 
                className="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={cartItemsList.length === 0}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9H9l-3-9H2"></path>
                  <path d="M5.45 5.11L2 12h6a2 2 0 0 1 2 2v1.82a5 5 0 0 0 2.47 1.64L11.89 22h2.67l1.42-6.54A5 5 0 0 0 18.31 16H22l-3.45-6.89z"></path>
                </svg>
                Proceed to Checkout
              </button>
              
              <div className="cart-promo-section">
                <h3 className="cart-promo-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 14l6-6"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  </svg>
                  Have a Promo Code?
                </h3>
                
                <div className="cart-promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="cart-promo-input"
                  />
                  <button 
                    className="cart-promo-btn"
                    onClick={handlePromoSubmit}
                    disabled={!promoCode.trim()}
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="cart-benefits">
                <div className="cart-benefit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Free delivery on orders over $30</span>
                </div>
                <div className="cart-benefit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Secure payment processing</span>
                </div>
                <div className="cart-benefit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>30-minute delivery guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart