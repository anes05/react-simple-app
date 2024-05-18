'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Product.belongsTo(models.Shop,{foreignKey:'shopId',as:'shop'});
    Product.hasOne(models.Assurance, { foreignKey: 'productId', as: 'assurance' });
    Product.belongsTo(models.Basket, { foreignKey: 'basketId', as: 'basket' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    shopId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Shop',
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
