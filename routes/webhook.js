const express = require('express');
const router = express.Router();
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY');
const User = require('../models/User');

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const endpointSecret = 'whsec_EXAMPLESECRET';
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook error', err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;

    // Activate membership
    await User.findByIdAndUpdate(userId, {
      membership: {
        isActive: true,
        startedAt: new Date(),
        stripeCustomerId: session.customer,
      }
    });
  }

  res.sendStatus(200);
});

module.exports = router;
