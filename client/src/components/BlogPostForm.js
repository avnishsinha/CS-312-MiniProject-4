import React, { useState } from 'react';

function BlogPostForm() {
  const [form, setForm] = useState({ title: '', content: '' });
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userId: user.userId })
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? 'Post created!' : 'Failed to create post'));
    if (res.ok) {
      setForm({ title: '', content: '' });
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
        <button type="submit">Post</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default BlogPostForm;