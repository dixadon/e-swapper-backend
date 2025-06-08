
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const itemSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  image: String,
  category: String
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/items', async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post('/api/items', upload.single('image'), async (req, res) => {
  const { user, title, description, category } = req.body;
  const image = req.file.filename;
  const item = await Item.create({ user, title, description, image, category });
  res.status(201).json(item);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
