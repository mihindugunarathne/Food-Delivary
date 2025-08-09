import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      }
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        setError("Something went wrong, please try again later.");
      }
    } catch (error) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  const deliveryFee = getTotalCartAmount() > 0 ? 2 : 0;
  const totalAmount = getTotalCartAmount() + deliveryFee;
  const orderItems = food_list.filter(item => cartItems[item._id] > 0);

  if (orderItems.length === 0) {
    return (
      <div className="place-order">
        <div className="place-order-container">
          <div className="place-order-loading">
            <div className="loading"></div>
            <span>Redirecting to cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='place-order'>
      <div className="place-order-container">
        <div className="place-order-header">
          <h1 className="place-order-title">Checkout</h1>
          <p className="place-order-subtitle">Complete your order and proceed to payment</p>
        </div>

        <div className="place-order-content">
          <div className="place-order-form">
            <div className="place-order-form-header">
              <h2 className="place-order-form-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Delivery Information
              </h2>
            </div>

            <form onSubmit={placeOrder} className="place-order-form-content">
              {error && (
                <div className="place-order-error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  {error}
                </div>
              )}

              <div className="place-order-section">
                <h3 className="place-order-section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Personal Information
                </h3>

                <div className="place-order-multi-fields">
                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      First Name
                    </label>
                    <input
                      required
                      name='firstName'
                      type="text"
                      placeholder='Enter your first name'
                      onChange={onChangeHandler}
                      value={data.firstName}
                      className="place-order-input"
                    />
                  </div>

                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Last Name
                    </label>
                    <input
                      required
                      name='lastName'
                      type="text"
                      placeholder='Enter your last name'
                      onChange={onChangeHandler}
                      value={data.lastName}
                      className="place-order-input"
                    />
                  </div>
                </div>

                <div className="place-order-input-group">
                  <label className="place-order-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Address
                  </label>
                  <input
                    required
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder='Enter your email address'
                    className="place-order-input"
                  />
                </div>

                <div className="place-order-input-group">
                  <label className="place-order-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <circle cx="12" cy="16" r="1"></circle>
                      <polyline points="7,11 7,7 5,7 5,5 19,5 19,7 17,7 17,11"></polyline>
                    </svg>
                    Phone Number
                  </label>
                  <input
                    required
                    name='phone'
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="tel"
                    placeholder='Enter your phone number'
                    className="place-order-input"
                  />
                </div>
              </div>

              <div className="place-order-section">
                <h3 className="place-order-section-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Delivery Address
                </h3>

                <div className="place-order-input-group">
                  <label className="place-order-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Street Address
                  </label>
                  <input
                    required
                    name='street'
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder='Enter your street address'
                    className="place-order-input"
                  />
                </div>

                <div className="place-order-multi-fields">
                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      City
                    </label>
                    <input
                      required
                      name='city'
                      onChange={onChangeHandler}
                      value={data.city}
                      type="text"
                      placeholder='Enter city'
                      className="place-order-input"
                    />
                  </div>

                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      State
                    </label>
                    <input
                      required
                      name='state'
                      onChange={onChangeHandler}
                      value={data.state}
                      type="text"
                      placeholder='Enter state'
                      className="place-order-input"
                    />
                  </div>
                </div>

                <div className="place-order-multi-fields">
                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      ZIP Code
                    </label>
                    <input
                      required
                      name='zipcode'
                      onChange={onChangeHandler}
                      value={data.zipcode}
                      type="text"
                      placeholder='Enter ZIP code'
                      className="place-order-input"
                    />
                  </div>

                  <div className="place-order-input-group">
                    <label className="place-order-label">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      Country
                    </label>
                    <input
                      required
                      name='country'
                      onChange={onChangeHandler}
                      value={data.country}
                      type="text"
                      placeholder='Enter country'
                      className="place-order-input"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="place-order-summary">
            <div className="place-order-summary-header">
              <h2 className="place-order-summary-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9H9l-3-9H2"></path>
                  <path d="M5.45 5.11L2 12h6a2 2 0 0 1 2 2v1.82a5 5 0 0 0 2.47 1.64L11.89 22h2.67l1.42-6.54A5 5 0 0 0 18.31 16H22l-3.45-6.89z"></path>
                </svg>
                Order Summary
              </h2>
            </div>

            <div className="place-order-summary-content">
              <div className="place-order-items">
                {orderItems.map((item) => (
                  <div key={item._id} className="place-order-item">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="place-order-item-image"
                    />
                    <div className="place-order-item-details">
                      <h4 className="place-order-item-name">{item.name}</h4>
                      <p className="place-order-item-price">${item.price}</p>
                    </div>
                    <span className="place-order-item-quantity">x{cartItems[item._id]}</span>
                  </div>
                ))}
              </div>

              <div className="place-order-summary-row">
                <span className="place-order-summary-label">Subtotal</span>
                <span className="place-order-summary-value">${getTotalCartAmount().toFixed(2)}</span>
              </div>

              <div className="place-order-summary-row">
                <span className="place-order-summary-label">Delivery Fee</span>
                <span className="place-order-summary-value">${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="place-order-summary-row">
                <span className="place-order-summary-label">Total</span>
                <span className="place-order-summary-value">${totalAmount.toFixed(2)}</span>
              </div>

              <button
                type='submit'
                className="place-order-submit-btn"
                onClick={placeOrder}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9H9l-3-9H2"></path>
                      <path d="M5.45 5.11L2 12h6a2 2 0 0 1 2 2v1.82a5 5 0 0 0 2.47 1.64L11.89 22h2.67l1.42-6.54A5 5 0 0 0 18.31 16H22l-3.45-6.89z"></path>
                    </svg>
                    Proceed to Payment
                  </>
                )}
              </button>

              <div className="place-order-security">
                <div className="place-order-security-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Secure payment processing</span>
                </div>
                <div className="place-order-security-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>30-minute delivery guarantee</span>
                </div>
                <div className="place-order-security-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Order tracking available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder