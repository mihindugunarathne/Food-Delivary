import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    const getCartItemCount = () => {
        const totalAmount = getTotalCartAmount();
        return totalAmount > 0 ? '!' : '';
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <>
            <nav className='navbar'>
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <Link to='/'>
                            <img src={assets.logo} alt="Food Delivery Logo" className='logo' />
                        </Link>
                    </div>
                    
                    <ul className='navbar-menu'>
                        <li>
                            <Link 
                                to='/' 
                                className={menu === "home" ? "active" : ""} 
                                onClick={() => setMenu("home")}
                            >
                                home
                            </Link>
                        </li>
                        <li>
                            <a 
                                href='#explore-menu' 
                                className={menu === "menu" ? "active" : ""} 
                                onClick={() => setMenu("menu")}
                            >
                                menu
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#app-download' 
                                className={menu === "download" ? "active" : ""} 
                                onClick={() => setMenu("download")}
                            >
                                mobile-app
                            </a>
                        </li>
                        <li>
                            <a 
                                href='#footer' 
                                className={menu === "contact-us" ? "active" : ""} 
                                onClick={() => setMenu("contact-us")}
                            >
                                contact us
                            </a>
                        </li>
                    </ul>

                    <div className="navbar-right">
                        <div className="navbar-search-btn" title="Search">
                            <img src={assets.search_icon} alt="Search" />
                        </div>
                        
                        <Link to='/cart' className="navbar-cart-icon" title="Shopping Cart">
                            <img src={assets.basket_icon} alt="Cart" />
                            {getTotalCartAmount() > 0 && (
                                <div className="navbar-cart-dot">
                                    {getCartItemCount()}
                                </div>
                            )}
                        </Link>

                        {!token ? (
                            <button 
                                className="navbar-auth-btn"
                                onClick={() => setShowLogin(true)}
                            >
                                Sign in
                            </button>
                        ) : (
                            <div className='navbar-profile'>
                                <img src={assets.profile_icon} alt="Profile" />
                                <ul className="nav-profile-dropdown">
                                    <li onClick={() => navigate('/myorders')}>
                                        <img src={assets.bag_icon} alt="Orders" />
                                        <span>My Orders</span>
                                    </li>
                                    <hr />
                                    <li onClick={logout}>
                                        <img src={assets.logout_icon} alt="Logout" />
                                        <span>Logout</span>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`navbar-mobile-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
            
            {/* Mobile Menu */}
            <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="navbar-brand" style={{marginBottom: '2rem'}}>
                    <img src={assets.logo} alt="Food Delivery Logo" className='logo' style={{width: '120px'}} />
                </div>
                
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    <li style={{marginBottom: '1rem'}}>
                        <Link 
                            to='/' 
                            className={menu === "home" ? "active" : ""}
                            onClick={() => {setMenu("home"); setMobileMenuOpen(false);}}
                            style={{
                                display: 'block',
                                padding: '0.75rem 0',
                                color: menu === "home" ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontWeight: menu === "home" ? '600' : '500',
                                textDecoration: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            Home
                        </Link>
                    </li>
                    <li style={{marginBottom: '1rem'}}>
                        <a 
                            href='#explore-menu'
                            className={menu === "menu" ? "active" : ""}
                            onClick={() => {setMenu("menu"); setMobileMenuOpen(false);}}
                            style={{
                                display: 'block',
                                padding: '0.75rem 0',
                                color: menu === "menu" ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontWeight: menu === "menu" ? '600' : '500',
                                textDecoration: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            Menu
                        </a>
                    </li>
                    <li style={{marginBottom: '1rem'}}>
                        <a 
                            href='#app-download'
                            className={menu === "download" ? "active" : ""}
                            onClick={() => {setMenu("download"); setMobileMenuOpen(false);}}
                            style={{
                                display: 'block',
                                padding: '0.75rem 0',
                                color: menu === "download" ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontWeight: menu === "download" ? '600' : '500',
                                textDecoration: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            Mobile App
                        </a>
                    </li>
                    <li style={{marginBottom: '1rem'}}>
                        <a 
                            href='#footer'
                            className={menu === "contact-us" ? "active" : ""}
                            onClick={() => {setMenu("contact-us"); setMobileMenuOpen(false);}}
                            style={{
                                display: 'block',
                                padding: '0.75rem 0',
                                color: menu === "contact-us" ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontWeight: menu === "contact-us" ? '600' : '500',
                                textDecoration: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            Contact Us
                        </a>
                    </li>
                </ul>

                {!token ? (
                    <button 
                        className="btn btn-primary"
                        onClick={() => {setShowLogin(true); setMobileMenuOpen(false);}}
                        style={{width: '100%', marginTop: '2rem'}}
                    >
                        Sign in
                    </button>
                ) : (
                    <div style={{marginTop: '2rem'}}>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => {navigate('/myorders'); setMobileMenuOpen(false);}}
                            style={{width: '100%', marginBottom: '1rem'}}
                        >
                            My Orders
                        </button>
                        <button 
                            className="btn btn-outline"
                            onClick={() => {logout(); setMobileMenuOpen(false);}}
                            style={{width: '100%'}}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar