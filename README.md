# 📝 CS-312 Mini Project 4: Blog Web Application Using React.js, Node.js, Express.js

This is the fourth part of the Mini Projects!

## 📌 Objective

The goal of this mini-project is to build a full-stack blog web application using **React.js** for the frontend and **Node.js + Express.js** for the backend. It upgrades the previous EJS-based server-side implementation (from Mini Project 1 or 3) with a modern client-side React interface.

Users can:
- Register and log in
- Create, view, edit, and delete blog posts
- View all public posts and personal profile
- Access protected routes using middleware-based authentication

---

## 🚀 How to Run

### 1. Start Backend Server
```bash
node index.js
````

### 2. Start Frontend React App

```bash
cd ./client
npm start
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:8000` *(adjust if changed)*

---

## ✨ Features

* 🔐 User Registration & Login
* ✍️ Create, Edit, Delete Blog Posts
* 🧾 View All Posts + My Profile Page
* 🛡️ Protected Routes using Middleware
* 🎨 Responsive Styling (CSS)

---

## 📁 Folder Structure

```
root/
├── client/               # React Frontend
│   ├── components/       # Reusable React components (BlogForm, PostList, etc.)
│   └── ...
├── server/               # Express Backend
│   ├── controllers/      # Blog and Auth controller logic
│   ├── middleware/       # Auth middleware for route protection
│   ├── models/           # User and Post models
│   └── routes/           # API route definitions
├── index.js              # Backend entry point
└── README.md             # This file
```

---

## 👨‍💻 Developer

**Avnish Kumar Sinha**
