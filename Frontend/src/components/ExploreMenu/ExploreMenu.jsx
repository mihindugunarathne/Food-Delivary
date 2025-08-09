import React from 'react'
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-container">
        <div className="explore-menu-header">
          <h2 className="explore-menu-title">Explore Our Menu</h2>
          <p className='explore-menu-text'>
            Choose from our diverse menu featuring a delectable array of dishes crafted with love and care. 
            From traditional favorites to modern culinary creations, discover flavors that will delight your taste buds.
          </p>
        </div>
        
        <div className='explore-menu-list'>
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            return (
              <div 
                onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
                className={`explore-menu-list-item ${isActive ? 'active' : ''}`} 
                key={index}
              >
                <div className="explore-menu-item-image-container">
                  <img src={item.menu_image} alt={item.menu_name} />
                </div>
                <p className="explore-menu-item-name">{item.menu_name}</p>
              </div>
            )
          })}
        </div>
        
        <hr className="explore-menu-divider" />
      </div>
    </div>
  )
}

export default ExploreMenu;