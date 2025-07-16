import React, { useEffect, useState } from 'react';

function MyProfile() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8000/api/blogs/user/${user.userId}`)
        .then(res => res.json())
        .then(data => setPosts(data));
    }
  }, [user]);

  if (!user) return <div>Please sign in to view your profile.</div>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><b>User ID:</b> {user.userId}</p>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Age:</b> {user.age}</p>
      <p><b>Occupation:</b> {user.occupation}</p>
      <p><b>City:</b> {user.city}</p>
      <h3>My Posts</h3>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MyProfile;