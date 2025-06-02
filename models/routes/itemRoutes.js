const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async (req, res) => {
  const item = await Item.create({ ...req.body, owner: req.user });
  res.json(item);
});

router.get('/', async (req, res) => {
  const items = await Item.find().populate('owner', 'email');
  res.json(items);
});

router.get('/my', auth, async (req, res) => {
  const items = await Item.find({ owner: req.user });
  res.json(items);
});

module.exports = router;
