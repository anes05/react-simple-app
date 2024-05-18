const express = require('express');
const router = express.Router();
const ShopController = require('../controllers/ShopController');

// Create a shop
router.post('/create', ShopController.create);

// Retrieve all shops
router.get('/getAll', ShopController.getAll);

// Retrieve a single shop by ID
router.get('/findById/:id', ShopController.getById);

// Update a shop
router.put('/updateById/:id', ShopController.update);

// Delete a shop
router.delete('/deleteById/:id', ShopController.delete);

module.exports = router;
