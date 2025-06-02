const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.send(user);
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).send('Invalid');
  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token });
});

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  const decoded = jwt.verify(token, 'secret');
  const user = await User.findById(decoded.id);
  res.json(user);
});

module.exports = router;
