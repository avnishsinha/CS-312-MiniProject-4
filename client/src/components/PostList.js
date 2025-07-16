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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.userId })
    });
    if (res.ok) setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><b>By:</b> {post.userId}</p>
          {user && user.userId === post.userId && (
            <>
              <Link to={`/edit/${post.id}`}>Edit</Link>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;