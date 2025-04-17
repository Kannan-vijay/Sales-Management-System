const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: String,
  place: String,
  date: String,
  amount: Number,
  quantity:[Number],
  rate:[Number],
  totalQuantity:Number,
  isPaid : Boolean
});

module.exports = mongoose.model("Farmer", farmerSchema);
