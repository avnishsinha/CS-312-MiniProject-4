exports.getAllPosts = (req, res) => {
  res.json(req.db.posts);
};

exports.createPost = (req, res) => {
  const { title, content, userId } = req.body;
  const post = { id: Date.now().toString(), title, content, userId };
  req.db.posts.push(post);
  res.status(201).json(post);
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;
  const post = req.db.posts.find(p => p.id === id);
  if (post && post.userId === userId) {
    post.title = title;
    post.content = content;
    res.json(post);
  } else {
    res.status(403).json({ message: 'Unauthorized or post not found' });
  }
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const index = req.db.posts.findIndex(p => p.id === id && p.userId === userId);
  if (index !== -1) {
    req.db.posts.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(403).json({ message: 'Unauthorized or post not found' });
  }
};

exports.getUserPosts = (req, res) => {
  const { userId } = req.params;
  const posts = req.db.posts.filter(p => p.userId === userId);
  res.json(posts);
};