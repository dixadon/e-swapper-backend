require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoute = require('./routes/webhook');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10'
});
const checkoutRoutes = require('./routes/checkout');
app.use('/api/checkout', checkoutRoutes);



app.use('/api/payment', paymentRoutes);
app.use('/api/webhook', webhookRoute); // Ensure this uses raw body middleware


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
