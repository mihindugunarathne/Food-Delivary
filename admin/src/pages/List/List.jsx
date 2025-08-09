import React, { useState, useEffect } from 'react'
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const fetchList = async() => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        setFilteredList(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("Failed to fetch list");
    } finally {
      setLoading(false);
    }
  }

  const removeFood = async(foodId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
        if (response.data.success) {
          toast.success("Food removed successfully");
          await fetchList();
        } else {
          toast.error("Failed to remove food");
        }
      } catch (error) {
        toast.error("Failed to remove food");
      }
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = list.filter(item => 
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
    setFilteredList(filtered);
  }

  useEffect(() => {
    fetchList();
  }, []);

  const stats = {
    totalItems: list.length,
    categories: [...new Set(list.map(item => item.category))].length,
    avgPrice: list.length > 0 ? (list.reduce((sum, item) => sum + item.price, 0) / list.length).toFixed(2) : 0
  };

  if (loading) {
    return (
      <div className="list">
        <div className="list-container">
          <div className="list-loading">
            <div className="loading"></div>
            <span>Loading menu items...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="list">
      <div className="list-container">
        <div className="list-header">
          <div>
            <h1 className="list-title">Menu Items</h1>
            <p className="list-subtitle">Manage your restaurant's food items</p>
          </div>
          
          <div className="list-actions">
            <div className="list-search">
              <svg className="list-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={handleSearch}
                className="list-search-input"
              />
            </div>
          </div>
        </div>

        <div className="list-stats">
          <div className="list-stat-card">
            <div className="list-stat-header">
              <span className="list-stat-title">Total Items</span>
              <div className="list-stat-icon primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
            </div>
            <div className="list-stat-value">{stats.totalItems}</div>
            <div className="list-stat-change">+2 this week</div>
          </div>

          <div className="list-stat-card">
            <div className="list-stat-header">
              <span className="list-stat-title">Categories</span>
              <div className="list-stat-icon success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20m8-10H4"></path>
                </svg>
              </div>
            </div>
            <div className="list-stat-value">{stats.categories}</div>
            <div className="list-stat-change">Active categories</div>
          </div>

          <div className="list-stat-card">
            <div className="list-stat-header">
              <span className="list-stat-title">Avg Price</span>
              <div className="list-stat-icon warning">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div className="list-stat-value">${stats.avgPrice}</div>
            <div className="list-stat-change">Per item</div>
          </div>
        </div>

        <div className="list-content">
          <div className="list-table-header">
            <div className="list-table-format title">
              <span>Image</span>
              <span>Item Details</span>
              <span>Category</span>
              <span>Price</span>
              <span>Actions</span>
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="list-empty">
              <div className="list-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="list-empty-title">
                {searchTerm ? 'No items found' : 'No menu items yet'}
              </div>
              <div className="list-empty-subtitle">
                {searchTerm ? 'Try adjusting your search terms' : 'Add your first menu item to get started'}
              </div>
            </div>
          ) : (
            filteredList.map((item, index) => (
              <div className="list-table-item fade-in" key={index}>
                <img 
                  src={`${url}/images/${item.image}`} 
                  alt={item.name}
                  className="list-item-image"
                />
                
                <div className="list-item-info">
                  <div className="list-item-name">{item.name}</div>
                  <div className="list-item-description">{item.description}</div>
                </div>
                
                <div className="list-item-category">{item.category}</div>
                
                <div className="list-item-price">{item.price}</div>
                
                <div className="list-item-actions">
                  <button 
                    className="list-action-btn edit"
                    title="Edit item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => removeFood(item._id)} 
                    className="list-action-btn delete"
                    title="Delete item"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default List