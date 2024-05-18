'use strict';
const { Product, Shop, Assurance, Basket } = require('../models');

class ProductController {
  static async create(req, res) {
    try {
      const { productName, description, serialNumber, price, quantity, shopId } = req.body;
      const product = await Product.create({ productName, description, serialNumber, price, quantity, shopId });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findAll(req, res) {
    try {
      const shopId = req.query.shopId || req.params.shopId;
      const whereClause = shopId ? { shopId } : {};
      const products = await Product.findAll({
        where: whereClause,
        include: [
          { model: Shop, as: 'shop' },
          //{ model: Assurance, as: 'assurance' },
          //{ model: Basket, as: 'baskets' }
        ]
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: Shop, as: 'shop' },
          //{ model: Assurance, as: 'assurance' },
         // { model: Basket, as: 'baskets' }
        ]
      });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { productName, description, serialNumber, price, quantity, shopId } = req.body;
      const [updated] = await Product.update({ productName, description, serialNumber, price, quantity, shopId }, {
        where: { id }
      });
      if (!updated) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({
        where: { id }
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
