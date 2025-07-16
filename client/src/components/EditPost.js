import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs')
      .then(res => res.json())
      .then(data => {
        const post = data.find(p => p.id === id);
        if (post) setForm({ title: post.title, content: post.content });
      });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userId: user.userId })
    });
    if (res.ok) {
      setMessage('Post updated!');
      navigate('/');
    } else {
      setMessage('Failed to update post');
    }
  };

  return (
    <div>
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} required /><br />
        <textarea name="content" value={form.content} onChange={handleChange} required /><br />
        <button type="submit">Update</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default EditPost;