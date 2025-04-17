const express = require("express");
const {getShopSummary, getSellerSummary, getFarmerSummary} = require("../controllers/shopController");

const router = express.Router();
//over all shop details
router.get("/summary", getShopSummary);
//Seller Details
router.get("/seller-summary", getSellerSummary);
//Farmer Details
router.get("/farmer-summary", getFarmerSummary);

module.exports = router;
