const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

router.post('/add', farmerController.addFarmer);
router.get('/', farmerController.getFarmerDetails);
router.get('/search', farmerController.getFarmerByName);
router.get('/:id', farmerController.getFarmerById);
router.get('/date/:date', farmerController.getFarmerByDate);
router.put('/pay/:id', farmerController.payFarmerBill);

module.exports = router;
