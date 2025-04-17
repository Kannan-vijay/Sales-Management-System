const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

router.post('/add', sellerController.addSeller);
router.get('/', sellerController.getSellerDetails);
router.get('/search', sellerController.getSellerByName);
router.get('/:id',sellerController.getSellerById)
router.put('/pay/:id', sellerController.updateSellerPayment);
router.put('/addamount', sellerController.updateSellerBalance);
router.get('/sellerPaymentDetail/:id', sellerController.getSellerTransactions);

module.exports = router;
