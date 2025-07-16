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
      <Link to="/">Home</Link> |{" "}
      {!user && <Link to="/signup">Signup</Link>} |{" "}
      {!user && <Link to="/signin">Signin</Link>} |{" "}
      {user && <Link to="/profile">My Profile</Link>} |{" "}
      {user && <button onClick={handleSignout}>Sign out</button>}
    </nav>
  );
}

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;