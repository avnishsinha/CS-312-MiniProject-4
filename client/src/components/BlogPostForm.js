import React, { useState } from 'react';

function BlogPostForm() {
  const [form, setForm] = useState({ title: '', body: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setMessage('You must be signed in to post.');
      return;
    }
    const res = await fetch('http://localhost:8000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
      body: JSON.stringify({ ...form, author: user.user_id })
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? 'Post created!' : 'Failed to create post'));
    if (res.ok) {
      setForm({ title: '', body: '' });
      window.location.reload();
    }
  };

  return (
    <div>
      <h2 style={{ color: '#61dafb' }}>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="body" placeholder="Body" value={form.body} onChange={handleChange} required />
        <button type="submit">Post</button>
      </form>
      {message && <div style={{ color: '#21a1f3' }}>{message}</div>}
    </div>
  );
}

export default BlogPostForm;