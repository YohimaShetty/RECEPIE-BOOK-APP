import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍳 Recipe Book
        </Link>
        {user && (
          <div className="navbar-menu">
            <Link to="/" className="navbar-link">My Recipes</Link>
            <Link to="/add-recipe" className="navbar-link">Add Recipe</Link>
            <span className="navbar-user">Hello, {user.username}!</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
