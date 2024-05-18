const { Shop } = require('../models');

exports.create = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Shop.update(req.body, { where: { id } });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json({ message: 'Shop updated successfully' });
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Shop.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
