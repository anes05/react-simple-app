'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.belongsTo(models.User,{foreignKey:'userId',as:'user'});
      Shop.hasMany(models.Product,{foreignKey:'shopId',as:'products'});    
      Shop.hasMany(models.Basket, { foreignKey: 'shopId', as: 'baskets' });
    }

  }
  Shop.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    shopName: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    numtel: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:'User',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};