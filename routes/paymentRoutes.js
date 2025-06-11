const express = require('express');
const router = express.Router();
const stripe = require('stripe')('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'); // Replace with your secret key
const User = require('../models/User'); // Adjust path as needed

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { email, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: 'price_1NXxxEXAMPLE', // Replace with real price ID
        quantity: 1,
      }],
      customer_email: email,
      metadata: { userId },
      success_url: 'https://your-site.com/membership-success.html',
      cancel_url: 'https://your-site.com/membership-cancel.html',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

module.exports = router;
