const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/send', upload.single('image'), (req, res) => {
  const { sender, receiver, text, room } = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = `https://e-swapper-backend.onrender.com/uploads/${req.file.filename}`;
  }

  const message = { text, imageUrl };
  req.io.to(room).emit('receiveMessage', message);
  res.json({ success: true, imageUrl });
});

module.exports = router;