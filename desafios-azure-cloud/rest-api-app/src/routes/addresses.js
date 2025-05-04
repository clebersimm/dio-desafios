const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/addressController');
const addressController = new AddressController();

router.get('/', addressController.getAllAddresses);
router.get('/:id', addressController.getAddressById);

module.exports = router;