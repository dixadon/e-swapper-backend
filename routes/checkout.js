// routes/checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10'
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: 'price_1ABCDEF12345678', // Replace with your actual Price ID
          quantity: 1
        }
      ],
      success_url: 'https://your-frontend.com/success',
      cancel_url: 'https://your-frontend.com/cancel'
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
