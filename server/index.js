const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

const globalData = { users: [], posts: [] };
app.use((req, res, next) => { req.db = globalData; next(); });

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Blog Backend is Running 🚀'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});