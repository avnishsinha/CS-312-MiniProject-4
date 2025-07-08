import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PostList from './PostList';
import BlogPostForm from './BlogPostForm';

function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Use useCallback to memoize the fetchPosts function
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const url = selectedCategory 
        ? `http://localhost:3000/api/posts?category=${selectedCategory}`
        : 'http://localhost:3000/api/posts';
      
      const response = await axios.get(url);
      setPosts(response.data.posts);
      setCategories(response.data.categories);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPosts();
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [fetchPosts]);

  const handleCreatePost = async (postData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/posts', postData);
      if (response.data.success) {
        setPosts([response.data.post, ...posts]);
        setShowForm(false);
      } else {
        alert('Failed to create post: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  const handleUpdatePost = async (id, postData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/posts/${id}`, postData);
      if (response.data.success) {
        setPosts(posts.map(post => 
          post.id === id ? response.data.post : post
        ));
      } else {
        alert('Failed to update post: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleDeletePost = async (id, author) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        data: { author }
      });
      if (response.data.success) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Failed to delete post: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>⏳ Loading posts...</h3>
      </div>
    );
  }

  return (
    <div>
      <h1>📚 Blog Posts</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Filter by Category:</label>
          <select 
            className="form-select" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6 d-flex align-items-end justify-content-end">
          {currentUser ? (
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '❌ Cancel' : '✍️ New Post'}
            </button>
          ) : (
            <div className="text-center">
              <p className="mb-2">Please sign in to create posts</p>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <BlogPostForm 
          onSubmit={handleCreatePost}
          categories={categories}
          currentUser={currentUser}
        />
      )}

      {posts.length === 0 ? (
        <div className="empty-state">
          <h3> No posts found</h3>
          <p>Be the first to share your thoughts!</p>
        </div>
      ) : (
        <PostList 
          posts={posts}
          onUpdate={handleUpdatePost}
          onDelete={handleDeletePost}
          currentUser={currentUser}
          categories={categories}
        />
      )}
    </div>
  );
}

export default Home; 