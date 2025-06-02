const mongoose = require('mongoose');
module.exports = mongoose.model('Item', new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}));
