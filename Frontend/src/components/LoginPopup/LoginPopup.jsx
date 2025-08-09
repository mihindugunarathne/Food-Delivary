import './LoginPopup.css';
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  }

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let newUrl = url;
      if (currState === "Login") {
        newUrl += "/api/user/login";
      } else {
        newUrl += "/api/user/register";
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setSuccess(currState === "Login" ? "Login successful!" : "Account created successfully!");
        setTimeout(() => {
          setShowLogin(false);
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setShowLogin(false);
    setError("");
    setSuccess("");
    setData({ name: "", email: "", password: "" });
  }

  return (
    <div className='login-popup' onClick={handleClose}>
      <div className='login-popup-container' onClick={(e) => e.stopPropagation()}>
        <div className="login-popup-header">
          <button className="login-popup-close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h2 className="login-popup-header-title">
            {currState === "Login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="login-popup-header-subtitle">
            {currState === "Login" 
              ? "Sign in to your account to continue" 
              : "Join us and start ordering delicious food"
            }
          </p>
        </div>

        <div className="login-popup-content">
          <form onSubmit={onLogin} className='login-popup-form'>
            {error && (
              <div className="login-popup-error">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="login-popup-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {success}
              </div>
            )}

            {currState === "Sign Up" && (
              <div className="login-popup-input-group">
                <label className="login-popup-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Full Name
                </label>
                <input
                  name='name'
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Enter your full name"
                  className="login-popup-input"
                  required
                />
              </div>
            )}

            <div className="login-popup-input-group">
              <label className="login-popup-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email Address
              </label>
              <input
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Enter your email address"
                className="login-popup-input"
                required
              />
            </div>

            <div className="login-popup-input-group">
              <label className="login-popup-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <polyline points="7,11 7,7 5,7 5,5 19,5 19,7 17,7 17,11"></polyline>
                </svg>
                Password
              </label>
              <input
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Enter your password"
                className="login-popup-input"
                required
              />
            </div>

            <button 
              type='submit' 
              className="login-popup-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading"></div>
                  {currState === "Login" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10,17 15,12 10,7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                  {currState === "Login" ? "Sign In" : "Create Account"}
                </>
              )}
            </button>

            <div className="login-popup-condition">
              <input type="checkbox" className="login-popup-checkbox" required />
              <p className="login-popup-condition-text">
                By continuing, I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">terms of use</a>
                {" "}&{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
              </p>
            </div>

            <div className="login-popup-divider">
              <span>or continue with</span>
            </div>

            <div className="login-popup-social">
              <button type="button" className="login-popup-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button type="button" className="login-popup-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
            </div>

            <div className="login-popup-switch">
              {currState === "Login" ? (
                <p className="login-popup-switch-text">
                  Don't have an account?{" "}
                  <span 
                    className="login-popup-switch-link" 
                    onClick={() => setCurrState("Sign Up")}
                  >
                    Sign up here
                  </span>
                </p>
              ) : (
                <p className="login-popup-switch-text">
                  Already have an account?{" "}
                  <span 
                    className="login-popup-switch-link" 
                    onClick={() => setCurrState("Login")}
                  >
                    Sign in here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup