const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Shoes',
      'Automobile',
      'Furniture',
      'Games and Toys',
      'Books',
      'Phones',
      'Jewelry',
      'Other'
    ],
    required: true
  },
  image: {
    type: String, // store the path or URL to the uploaded image
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  swapPreference: {
    type: String,
    enum: ['specific', 'open'],
    required: true
  },
  desiredItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    default: null // only used when swapPreference is 'specific'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
