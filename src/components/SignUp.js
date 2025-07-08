import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    name: '',
    age: '',
    occupation: '',
    city: ''
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
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      if (response.data.success) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        navigate('/');
        window.location.reload();
      } else {
        setError(response.data.error || 'Sign up failed');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-header text-center">
            <h2>✨ Sign Up</h2>
            <p className="mb-0">Create your Blog Hub account</p>
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
                  placeholder="Choose a user ID..."
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">🔑 Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password..."
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">📝 Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">🎂 Age:</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Your age (optional)"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">💼 Occupation:</label>
                <input
                  type="text"
                  name="occupation"
                  className="form-control"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Your occupation (optional)"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">🏙️ City:</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city (optional)"
                />
              </div>
              
              <button 
                className="btn btn-success w-100" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Signing Up...' : '🚀 Sign Up'}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p>Already have an account? <Link to="/signin">Sign in here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp; 