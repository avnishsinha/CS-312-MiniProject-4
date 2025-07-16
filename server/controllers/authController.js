exports.signup = (req, res) => {
  const { userId, password, name, age, occupation, city } = req.body;
  if (req.db.users.some(u => u.userId === userId)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = { userId, password, name, age, occupation, city };
  req.db.users.push(user);
  res.status(201).json({ message: 'Signup successful' });
};

exports.signin = (req, res) => {
  const { userId, password } = req.body;
  const user = req.db.users.find(u => u.userId === userId && u.password === password);
  if (user) {
    res.json({ message: 'Signin successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};