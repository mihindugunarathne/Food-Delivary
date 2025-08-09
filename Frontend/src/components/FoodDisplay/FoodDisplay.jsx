import React, { useContext, useState, useMemo } from 'react'
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
  const {food_list} = useContext(StoreContext);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  // Filter and sort food items
  const filteredAndSortedItems = useMemo(() => {
    let filtered = food_list.filter(item => 
      category === 'All' || category === item.category
    );

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [food_list, category, sortBy]);

  if (!food_list || food_list.length === 0) {
    return (
      <div className='food-display' id='food-display'>
        <div className="food-display-container">
          <div className="food-display-loading">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="food-display-skeleton">
                <div className="food-display-skeleton-image"></div>
                <div className="food-display-skeleton-content">
                  <div className="food-display-skeleton-line short"></div>
                  <div className="food-display-skeleton-line long"></div>
                  <div className="food-display-skeleton-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-container">
        <div className="food-display-header">
          <h2 className="food-display-title">
            {category === 'All' ? 'Top Dishes Near You' : `${category} Dishes`}
          </h2>
          <p className="food-display-subtitle">
            Discover delicious meals crafted with the finest ingredients and delivered fresh to your door
          </p>
        </div>

        <div className="food-display-filters">
          <span className="food-display-filter-label">Sort by:</span>
          <div className="food-display-sort">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18l-2 12H5L3 6z"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="food-display-results">
          <div className="food-display-count">
            Showing <strong>{filteredAndSortedItems.length}</strong> {filteredAndSortedItems.length === 1 ? 'item' : 'items'}
            {category !== 'All' && <span> in <strong>{category}</strong></span>}
          </div>
          
          <div className="food-display-view-toggle">
            <button 
              className={`food-display-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button 
              className={`food-display-view-btn ${viewMode === 'compact' ? 'active' : ''}`}
              onClick={() => setViewMode('compact')}
              title="Compact view"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {filteredAndSortedItems.length === 0 ? (
          <div className="food-display-empty">
            <div className="food-display-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="food-display-empty-title">No dishes found</div>
            <div className="food-display-empty-subtitle">
              {category === 'All' 
                ? "We're working on adding more delicious options for you"
                : `No dishes available in the ${category} category right now`
              }
            </div>
          </div>
        ) : (
          <div className={`food-display-list ${viewMode === 'compact' ? 'compact' : ''}`}>
            {filteredAndSortedItems.map((item, index) => (
              <FoodItem 
                key={item._id || index} 
                id={item._id} 
                name={item.name} 
                description={item.description} 
                price={item.price} 
                image={item.image} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay;