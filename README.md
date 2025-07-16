# CS-312 Mini Project 4: Blog Web Application

## Description

This is a full-stack blog web application developed for CS-312. It uses React.js for the frontend and Node.js with Express.js for the backend. Users can sign up, log in, create blog posts, edit them, delete them, and view posts in a profile view.

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Authentication: JWT (via custom middleware)
- Styling: Plain CSS

## Folder Structure

```
BlogReactNodeTest/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BlogPost.js
│   │   │   ├── EditPost.js
│   │   │   ├── MyProfile.js
│   │   │   └── PostList.js
│   │   ├── styles/
│   │   ├── Signin.js
│   │   ├── Signup.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── postModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   └── index.js
│   ├── index.js
│   └── package.json
└── .gitignore
````

## How to Run

1. Clone the repository

```bash
git clone https://github.com/avnishsinha/CS-312-MiniProject-4.git
cd CS-312-MiniProject-4
````

2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Run the app

```bash
# Backend
cd server
node index.js

# Frontend
cd ../client
npm start
```

Frontend runs on `http://localhost:3000`

## Features

* User registration and login
* Create, update, and delete blog posts
* View all posts and personal profile
* Basic route protection using middleware

## Developer

Avnish Kumar Sinha
CS-312 – Northern Arizona University
Solo project

```