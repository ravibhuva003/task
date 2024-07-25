// backend/models/CartItem.js

const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  partNumber: String,
  manufacturer: String,
  dataProvider: String,
  volume: Number,
  unitPrice: Number,
  totalPrice: Number,
});

module.exports = mongoose.model('CartItem', CartItemSchema);
