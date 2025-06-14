const express = require('express');
const router = express.Router();
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY'); // Replace with your secret key
const User = require('../models/User'); // Adjust path as needed

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { email, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: 'price_1RYtOLP93qXLlc6iobWmjoBQ', // Replace with real price ID
        quantity: 1,
      }],
      customer_email: email,
      metadata: { userId },
      success_url: 'https://e-swapper.netlify.app/membership-success.html',
      cancel_url: 'https://e-swapper.netlify.app/membership-cancel.html',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

module.exports = router;
