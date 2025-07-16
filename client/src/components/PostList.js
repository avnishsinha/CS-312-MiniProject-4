import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this post?')) return;
    const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user?.token}` }
    });
    if (res.ok) setPosts(posts.filter(post => post._id !== id));
  };

  return (
    <div>
      <h2 style={{ color: '#61dafb' }}>All Blog Posts</h2>
      {posts.length === 0 && <p>No posts yet. Be the first to post!</p>}
      {posts.map(post => (
        <div className="post" key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p style={{ fontSize: '0.9em', color: '#888' }}><b>By:</b> {post.author}</p>
          {user && user.user_id === post.author && (
            <div className="post-actions">
              <Link to={`/edit/${post._id}`} style={{ marginRight: 10 }}>Edit</Link>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;