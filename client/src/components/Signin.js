import React, { useState } from 'react';

function Signin() {
  const [form, setForm] = useState({ userId: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Signin successful!');
      window.location.href = '/';
    } else {
      setMessage(data.message || 'Signin failed');
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <button type="submit">Signin</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Signin;