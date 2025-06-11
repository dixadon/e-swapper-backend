const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ Add this block to enable membership tracking
  membership: {
    isActive: { type: Boolean, default: false },
    startedAt: Date,
    stripeCustomerId: String
  }
});

module.exports = mongoose.model('User', userSchema);
