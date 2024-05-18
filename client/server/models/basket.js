'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Basket.hasMany(models.Product, { foreignKey: 'basketId', as: 'products' });
    }
  }
  Basket.init({
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:'User',
        key:'id'
      }
    },
    shopId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Shop',
        key:'id'
      }
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true
    }
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};