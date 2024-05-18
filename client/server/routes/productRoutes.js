const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

// Create a new product
router.post('/', ProductController.create);

// Retrieve all products, optionally filtering by shopId
router.get('/', ProductController.findAll);

// Retrieve all products for a specific shop (by shopId)
router.get('/shop/:shopId', ProductController.findAll);

// Retrieve a single product by ID
router.get('/:id', ProductController.findOne);

// Update a product by ID
router.put('/:id', ProductController.update);

// Delete a product by ID
router.delete('/:id', ProductController.delete);

module.exports = router;