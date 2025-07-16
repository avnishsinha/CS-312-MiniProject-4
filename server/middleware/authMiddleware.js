module.exports = (req, res, next) => {
  const { userId } = req.body;
  const user = req.db.users.find(u => u.userId === userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing user ID' });
  }
  next();
};