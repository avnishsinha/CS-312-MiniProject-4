// server/middleware/authMiddleware.js
module.exports = (req, res, next) => {
  // Try to get userId from body, query, or headers
  const userId = req.body.userId || req.query.userId || req.headers['x-user-id'];
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: Missing user ID' });
  }
  const user = req.db.users.find(u => u.userId === userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
  }
  req.user = user;
  next();
};