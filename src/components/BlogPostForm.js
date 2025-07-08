import React, { useState, useEffect } from 'react';

function BlogPostForm({ onSubmit, categories, currentUser, editPost = null }) {
  const [formData, setFormData] = useState({
    title: editPost ? editPost.title : '',
    content: editPost ? editPost.content : '',
    author: editPost ? editPost.author : (currentUser ? currentUser.name : ''),
    category: editPost ? editPost.category : categories[0] || ''
  });

  useEffect(() => {
    if (currentUser && !editPost) {
      setFormData((prev) => ({ ...prev, author: currentUser.name }));
    }
  }, [currentUser, editPost]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (!editPost) {
        setFormData({
          title: '',
          content: '',
          author: currentUser ? currentUser.name : '',
          category: categories[0] || ''
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>{editPost ? '✏️ Edit Post' : '✍️ Create New Post'}</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">📝 Title:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title..."
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">🏷️ Category:</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">👤 Author Name:</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formData.author}
              readOnly
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">📄 Content:</label>
            <textarea
              name="content"
              className="form-control"
              rows="8"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here..."
              required
            ></textarea>
          </div>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-success" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Saving...' : (editPost ? '💾 Save Changes' : '📤 Create Post')}
            </button>
            
            {editPost && (
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={() => onSubmit(null)} // Cancel edit
              >
                ❌ Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogPostForm; 