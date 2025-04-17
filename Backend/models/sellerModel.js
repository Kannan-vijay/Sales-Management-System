const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  detail: String,
  date: String,
  amount: Number
});

const sellerSchema = new mongoose.Schema({
  name: String,
  place: String,
  totalAmount: Number,
  paidAmount: Number,
  transactions :[transactionSchema],
});

module.exports = mongoose.model("Seller", sellerSchema);
