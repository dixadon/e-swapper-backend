const express = require('express');
const router = express.Router();
const multer = require('multer');
const Message = require('../models/Message');
const auth = require('../middleware/authMiddleware');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

router.post('/markAllRead', auth, async (req, res) => {
  await Message.updateMany({ receiver: req.user, read: false }, { $set: { read: true } });
  res.send({ message: 'All marked as read' });
});

router.get('/conversations', auth, async (req, res) => {
  const messages = await Message.find({ $or: [{ sender: req.user }, { receiver: req.user }] });
  const users = [...new Set(messages.map(m => m.sender.equals(req.user) ? m.receiver : m.sender))];
  const convo = await Promise.all(users.map(async id => {
    const count = await Message.countDocuments({ receiver: req.user, sender: id, read: false });
    return { _id: id, unreadCount: count };
  }));
  res.json(convo);
});

module.exports = router;
