import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [formData, setFormData] = useState({
    user_id: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      console.log('Attempting to sign in with:', formData);
      const response = await axios.post('http://localhost:3000/api/signin', formData);
      console.log('Sign in response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        navigate('/');
        window.location.reload(); // Force reload to update navbar
      } else {
        setError(response.data.error || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.response?.data?.error || 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-header text-center">
            <h2>🔐 Sign In</h2>
            <p className="mb-0">Welcome back to Blog Hub</p>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">👤 User ID:</label>
                <input
                  type="text"
                  name="user_id"
                  className="form-control"
                  value={formData.user_id}
                  onChange={handleChange}
                  placeholder="Enter your user ID..."
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label"> Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  required
                />
              </div>
              
              <button 
                className="btn btn-primary w-100" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Signing In...' : '🚀 Sign In'}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;   
