import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import PostList from './components/PostList';
import EditPost from './components/EditPost';
import MyProfile from './components/MyProfile';
import './styles/App.css';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/signup">Signup</Link>}
      {!user && <Link to="/signin">Signin</Link>}
      {user && <Link to="/profile">My Profile</Link>}
      {user && <button onClick={handleSignout}>Sign out</button>}
    </nav>
  );
}

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="container">
      {user && <BlogPostForm />}
      <PostList />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<div className="container"><Signup /></div>} />
        <Route path="/signin" element={<div className="container"><Signin /></div>} />
        <Route path="/edit/:id" element={<div className="container"><EditPost /></div>} />
        <Route path="/profile" element={<div className="container"><MyProfile /></div>} />
      </Routes>
    </Router>
  );
}

export default App;