'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Assurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Assurance.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  Assurance.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    type: DataTypes.ENUM('Partiel','Tout Risque', 'Vol'),
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    price: DataTypes.DOUBLE,
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model:'Product',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Assurance',
  });
  return Assurance;
};