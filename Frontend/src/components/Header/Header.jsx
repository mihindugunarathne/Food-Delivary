import React from 'react'
import './Header.css';

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className="header-container">
        <div className="header-contents">
          <div className="header-badge">
            <div className="header-badge-icon"></div>
            <span>Free delivery on orders over $30</span>
          </div>
          
          <h1 className="header-title">
            Order your <span className="header-title-highlight">favourite food</span> here
          </h1>
          
          <p className="header-description">
            Choose from our diverse menu featuring a delectable array of dishes crafted with love and care. 
            Our passionate chefs create mouth-watering dishes that will leave your taste buds in awe. 
            Experience culinary excellence delivered right to your door.
          </p>
          
          <div className="header-actions">
            <button className="header-cta-btn" onClick={scrollToMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <path d="M20.2 20.2c2.04-2.03 4.8-8.2 4.8-11.2 0-6.5-4.2-9-9-9s-9 2.5-9 9c0 3 2.76 9.17 4.8 11.2"></path>
              </svg>
              View Menu
            </button>
            
            <button className="header-secondary-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              Watch Video
            </button>
          </div>
          
          <div className="header-stats">
            <div className="header-stat">
              <div className="header-stat-number">50K+</div>
              <div className="header-stat-label">Happy Customers</div>
            </div>
            <div className="header-stat">
              <div className="header-stat-number">200+</div>
              <div className="header-stat-label">Menu Items</div>
            </div>
            <div className="header-stat">
              <div className="header-stat-number">30min</div>
              <div className="header-stat-label">Avg Delivery</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-scroll-indicator">
        <span>Scroll Down</span>
        <div className="header-scroll-arrow"></div>
      </div>
    </div>
  )
}

export default Header