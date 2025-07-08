import React, { useState } from 'react';
import BlogPostForm from './BlogPostForm';

function PostList({ posts, onUpdate, onDelete, currentUser, categories }) {
  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleUpdate = (postData) => {
    if (postData) {
      onUpdate(editingPost.id, postData);
    }
    setEditingPost(null);
  };

  const handleDelete = (post) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      // Pass the author information for backend validation
      onDelete(post.id, post.author);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="card-header">
            <h3>{post.title}</h3>
            <div className="post-meta">
              <span>By {post.author}</span>
              <span className="ms-3">📅 {formatDate(post.createdAt)}</span>
              <span className="ms-3">🏷️ {post.category}</span>
            </div>
          </div>
          
          <div className="card-body">
            <div className="post-content">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            {currentUser && currentUser.name === post.author && (
              <div className="d-flex gap-2 mt-3">
                <button 
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(post)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post)}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
          
          {editingPost && editingPost.id === post.id && (
            <div className="card-footer">
              <BlogPostForm
                onSubmit={handleUpdate}
                categories={categories}
                currentUser={currentUser}
                editPost={editingPost}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList; 