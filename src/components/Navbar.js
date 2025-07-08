import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          📝 Blog Hub
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
              🏠 Home
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  className="nav-link" 
                  to={`/profile/${currentUser.user_id}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 My Profile
                </Link>
                <button 
                  className="btn btn-outline-light ms-2" 
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  className="nav-link" 
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔐 Sign In
                </Link>
                <Link 
                  className="nav-link" 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 