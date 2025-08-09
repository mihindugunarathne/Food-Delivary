import React, { useState } from 'react'
import "./Add.css";
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]: value}));
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);
      
      const response = await axios.post(`${url}/api/food/add`, formData);
      if(response.data.success){
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add">
      <div className="add-container">
        <div className="add-header">
          <h1 className="add-title">Add New Menu Item</h1>
          <p className="add-subtitle">Create a new food item for your restaurant menu</p>
        </div>

        <form className="add-form" onSubmit={onSubmitHandler}>
          <div className="add-form-header">
            <h2 className="add-form-title">Item Details</h2>
          </div>

          <div className="add-form-body">
            <div className="add-img-upload">
              <label className="add-img-upload-label">Product Image *</label>
              <div className={`add-img-upload-area ${image ? 'has-image' : ''}`}>
                {image ? (
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="add-img-preview"
                  />
                ) : (
                  <div className="add-img-placeholder">
                    <div className="add-img-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21,15 16,10 5,21"></polyline>
                      </svg>
                    </div>
                    <div className="add-img-text">
                      <div className="add-img-title">Upload Product Image</div>
                      <div className="add-img-subtitle">PNG, JPG up to 5MB</div>
                    </div>
                  </div>
                )}
                <input 
                  onChange={(e)=>setImage(e.target.files[0])} 
                  type="file" 
                  accept="image/*"
                  className="add-img-input"
                  required 
                />
              </div>
            </div>

            <div className="add-form-grid">
              <div className="add-product-name">
                <label className="form-label">Product Name *</label>
                <input 
                  onChange={onChangeHandler} 
                  value={data.name} 
                  type="text" 
                  name='name' 
                  placeholder='Enter product name'
                  className="form-input"
                  required
                />
              </div>

              <div className="add-product-description">
                <label className="form-label">Product Description *</label>
                <textarea 
                  onChange={onChangeHandler} 
                  value={data.description} 
                  name='description' 
                  rows="4" 
                  placeholder='Describe your product...'
                  className="form-textarea"
                  required
                />
              </div>

              <div className="add-category-price">
                <div className="add-category">
                  <label className="form-label">Category *</label>
                  <select 
                    onChange={onChangeHandler} 
                    name='category' 
                    value={data.category}
                    className="form-select"
                    required
                  >
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Cake">Cake</option>
                  </select>
                </div>
                <div className="add-price">
                  <label className="form-label">Price *</label>
                  <input 
                    onChange={onChangeHandler} 
                    value={data.price} 
                    type="number" 
                    name='price' 
                    placeholder='0.00'
                    min="0"
                    step="0.01"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="add-form-actions">
              <button 
                type="button" 
                className="add-btn add-btn-secondary"
                onClick={() => {
                  setData({name: '', description: '', price: '', category: 'Salad'});
                  setImage(false);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                </svg>
                Clear
              </button>
              <button 
                type="submit" 
                className='add-btn'
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="loading"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Add Item
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add