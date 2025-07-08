import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostList from './PostList';

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use useCallback to memoize the fetchProfile function
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/profile/${userId}`);
      setProfile(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]); // Add userId as dependency

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // Now fetchProfile is stable and can be included

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!profile) {
    return <div className="empty-state">Profile not found</div>;
  }

  return (
    <div>
      <h1>👤 My Profile</h1>
      
      <div className="card mb-4">
        <div className="card-header">
          <h3>User Information</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>User ID:</strong> {profile.user.user_id}</p>
              <p><strong>Name:</strong> {profile.user.name}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Age:</strong> {profile.user.age || 'Not specified'}</p>
              <p><strong>Occupation:</strong> {profile.user.occupation || 'Not specified'}</p>
              <p><strong>City:</strong> {profile.user.city || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>

      <h3>📝 My Blog Posts ({profile.posts.length})</h3>
      <PostList 
        posts={profile.posts}
        onUpdate={() => {}} // Profile view doesn't need update/delete
        onDelete={() => {}}
        currentUser={null}
        categories={[]}
      />
    </div>
  );
}

export default Profile; 