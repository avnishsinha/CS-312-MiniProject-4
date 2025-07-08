import React from 'react';

function TestComponent() {
  const testFeatures = () => {
    console.log('Testing all features...');
    
    // Test localStorage
    const testUser = {
      user_id: 'testuser',
      name: 'Test User',
      age: 25,
      occupation: 'Developer',
      city: 'Test City'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(testUser));
    const retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage test:', retrievedUser);
    
    // Test API endpoints
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => console.log('Posts API test:', data))
      .catch(error => console.error('API test failed:', error));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>🧪 Test Panel</h3>
      </div>
      <div className="card-body">
        <button className="btn btn-info" onClick={testFeatures}>
          Run Tests
        </button>
        <p className="mt-2">Check browser console for test results</p>
      </div>
    </div>
  );
}

export default TestComponent; 