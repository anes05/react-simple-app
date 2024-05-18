'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.Shop,{foreignKey:'userId',as:'shops'})
        User.hasMany(models.Basket, { foreignKey: 'userId', as: 'baskets' });

    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    numtel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};