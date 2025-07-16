import React, { useEffect, useState } from 'react';

function MyProfile() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/api/blogs?author=${user.user_id}`)
        .then(res => res.json())
        .then(data => setPosts(data));
    }
  }, [user]);

  if (!user) return <div>Please sign in to view your profile.</div>;

  return (
    <div>
      <h2 style={{ color: '#61dafb' }}>My Profile</h2>
      <p><b>User ID:</b> {user.user_id}</p>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Age:</b> {user.age}</p>
      <p><b>Occupation:</b> {user.occupation}</p>
      <p><b>City:</b> {user.city}</p>
      <h3>My Posts</h3>
      {posts.length === 0 && <p>You haven't posted anything yet.</p>}
      {posts.map(post => (
        <div className="post" key={post._id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default MyProfile;