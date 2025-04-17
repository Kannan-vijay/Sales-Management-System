const Farmer = require('../models/farmerModel');

// Add New Farmer
exports.addFarmer = async (req, res) => {
  const { name, place, date ,quantity, rate, amount, totalQuantity ,advance} = req.body;
  const isPaid=false;

  try {
    const newFarmer = new Farmer({ name, place, date, quantity, rate, amount, totalQuantity, advance ,isPaid});
    const duplicate = await Farmer.findOne({$and :[{name : name},{date:date}]});
    if(duplicate){
      res.status(400).json({message : "farmer Already exists"});
      return;
    }
    const farmer = await newFarmer.save();
    res.status(201).json(farmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Farmer Details
exports.getFarmerDetails = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Get Farmer By Id
exports.getFarmerById = async (req, res) => {
  try {
    const {id} = req.params;
    const farmers = await Farmer.findById(id);
    res.status(200).json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get Farmer By Date
exports.getFarmerByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const farmers = await Farmer.find({ date: date });
    if (farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found for this date" });
    }

    res.status(200).json(farmers);
  } catch (err) {
    console.error("Error fetching farmers:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getFarmerByName = async (req, res) => {
  try {
    const name = req.query.name;
    const farmers = await Farmer.find({ "name": { $regex: name, $options: 'i' } });
    if (farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found for this Name" });
    }

    res.status(200).json(farmers);
  } catch (err) {
    console.error("Error fetching farmers:", err);
    res.status(500).json({ message: err.message });
  }
};
// Update Farmer Payment Status
exports.payFarmerBill = async (req, res) => {
  const { id } = req.params;

  try {
    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }
    if(farmer.isPaid){
      return res.status(200).json({ message: 'Already Paid' });
    }
    farmer.isPaid = true;
    await farmer.save();
    res.status(200).json({message : 'paid Sucessfully'});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
