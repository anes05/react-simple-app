'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Baskets', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Baskets', 'fk_basket_user_id');
    await queryInterface.removeConstraint('Baskets', 'fk_basket_shop_id');
  }
};

