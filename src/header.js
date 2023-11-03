import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="navigation">
        {!access_token && !refresh_token && (
          <>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Signin
            </Link>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              Login
            </Link>
          </>
        )}
        {access_token && refresh_token && (
          <>
            <Link to="/post" className={location.pathname === '/post' ? 'active' : ''}>
              Post
            </Link>
            <Link to="/get" className={location.pathname === '/get' ? 'active' : ''}>
              Get
            </Link>
            <Link to="/update" className={location.pathname === '/update' ? 'active' : ''}>
              Update
            </Link>
            <Link to="/delete" className={location.pathname === '/delete' ? 'active' : ''}>
              Delete
            </Link>
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
