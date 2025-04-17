const Seller = require("../models/sellerModel");
const Farmer = require("../models/farmerModel");

//  Get overall shop summary
const getShopSummary = async (req, res) => {
  try {
    const sellers = await Seller.find();
    const farmers = await Farmer.find();

    const totalSales = sellers.reduce((sum, s) => sum + s.paidAmount, 0);
    const totalExpenses = farmers.reduce((sum, f) => sum +((f.isPaid)?f.amount:0), 0);
    const profit = totalSales - totalExpenses;

    res.json({
      totalSales,
      totalExpenses,
      profit,
      sellerCount: sellers.length,
      farmerCount: farmers.length,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Get seller summary
const getSellerSummary = async (req, res) => {
  try {
    const sellers = await Seller.find();

    const summary = sellers.map((s) => ({
      name: s.name,
      totalAmount: s.totalAmount,
      paidAmount: s.paidAmount,
      remainingAmount: s.totalAmount - s.paidAmount
    }));

    res.json(summary);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Get farmer summary
const getFarmerSummary = async (req, res) => {
  try {
    const farmers = await Farmer.find();

    const summary = farmers.map((f) => ({
      name: f.name,
      place : f.place,
      date : f.date,
      totalQuantity : f.totalQuantity,
      amount: f.amount,
      isPaid : f.isPaid
    }));

    res.json(summary);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { getShopSummary, getSellerSummary, getFarmerSummary };
