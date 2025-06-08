
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let posts = [
  { user: '@username', text: 'Looking to trade my PS4 for a laptop. DM me!' },
  { user: '@username', text: 'Swapped a bike for an electric scooter today! 🚲🔁🛴' }
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { user, text } = req.body;
  if (user && text) {
    posts.unshift({ user, text });
    res.status(201).json({ message: 'Post added' });
  } else {
    res.status(400).json({ message: 'Invalid post' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
