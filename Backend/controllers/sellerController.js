const Seller = require('../models/sellerModel');

// Add New Seller
exports.addSeller = async (req, res) => {
  const { name, place ,totalAmount ,transactions} = req.body;
  const paidAmount = 0;

  try {
    const newSeller = new Seller({ name, place ,totalAmount, paidAmount ,transactions});
    const seller = await newSeller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Seller Details
exports.getSellerDetails = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get seller By ID
exports.getSellerById = async (req, res) => {
  try {
    const {id} = req.params;
    const seller = await Seller.findById(id);
    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get Seller by Name
exports.getSellerByName = async (req, res) => {
  try {
    const name = req.query.name;
    const seller = await Seller.find({ "name": { $regex: name, $options: 'i' } });
    if(seller.length == 0){
      return res.status(400).json({
        message:"No sellers Found in this name"
      })
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Seller Payment
exports.updateSellerPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    const {detail, date, amount} = req.body;
    const transaction = {detail,date,amount};
    seller.transactions.push(transaction);
    seller.paidAmount += amount;
    await seller.save();
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Update Sellet Balance
exports.updateSellerBalance = async (req, res) => {
  const {name , place} = req.body;
  try {
    const seller = await Seller.findOne({$and :[{name : name},{place:place}]});
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    const {detail, date, amount} = req.body;
    const transaction = {detail,date,amount};
    seller.transactions.push(transaction);
    seller.totalAmount += amount;
    await seller.save();
    res.status(200).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//GET Seller Transaction
exports.getSellerTransactions = async (req,res) =>{
  const {id} = req.params;
  try{
    const seller = await Seller.findById(id);
    if(!seller){
      return res.status(404).json({message:"No Seller Found"})
    }
    return res.status(200).json(seller.transactions);
  }
  catch (e){
    res.status(400).json({message : e.message});
  }
};

