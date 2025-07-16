import React, { useState } from 'react';

function Signup() {
  const [form, setForm] = useState({ user_id: '', password: '', name: '', age: '', occupation: '', city: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? 'Signup successful!' : 'Signup failed'));
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="user_id" placeholder="User ID" value={form.user_id} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} /><br />
        <input name="occupation" placeholder="Occupation" value={form.occupation} onChange={handleChange} /><br />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} /><br />
        <button type="submit">Signup</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Signup;