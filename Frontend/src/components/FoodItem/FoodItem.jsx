import React, { useContext } from 'react'
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id, name, price, description, image}) => {
  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
  const itemCount = cartItems[id] || 0;

  return (
    <div className='food-item fade-in-scale'>
      <div className="food-item-img-container">
        <img 
          className='food-item-image' 
          src={url + "/images/" + image} 
          alt={name}
        />
        
        <div className="food-item-overlay"></div>
        
        {/* Optional: Popular badge for certain items */}
        {price > 20 && (
          <div className="food-item-badge">Popular</div>
        )}
        
        {!itemCount ? (
          <button 
            className="food-item-add-btn" 
            onClick={() => addToCart(id)}
            title="Add to cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        ) : (
          <div className="food-item-counter">
            <button 
              className="food-item-counter-btn remove" 
              onClick={() => removeFromCart(id)}
              title="Remove from cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span className="food-item-counter-value">{itemCount}</span>
            <button 
              className="food-item-counter-btn add" 
              onClick={() => addToCart(id)}
              title="Add to cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <div className="food-item-info">
        <div className="food-item-header">
          <h3 className="food-item-name">{name}</h3>
          <div className="food-item-rating">
            <img src={assets.rating_starts} alt="Rating" />
          </div>
        </div>
        
        <p className='food-item-desc'>{description}</p>
        
        <div className="food-item-footer">
          <p className='food-item-price'>{price}</p>
          <div className="food-item-meta">
            <div className="food-item-meta-item">
              <svg className="food-item-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <span>20-30 min</span>
            </div>
            <div className="food-item-meta-item">
              <svg className="food-item-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11z"></path>
              </svg>
              <span>Fresh</span>
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default FoodItem;