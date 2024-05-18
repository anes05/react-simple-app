'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add associations between models if they don't already exist
    if (!(await queryInterface.describeTable('Products')).hasOwnProperty('basketId')) {
      await queryInterface.addColumn('Products', 'basketId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Baskets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    if (!(await queryInterface.describeTable('Assurances')).hasOwnProperty('productId')) {
      await queryInterface.addColumn('Assurances', 'productId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    if (!(await queryInterface.describeTable('Baskets')).hasOwnProperty('shopId')) {
      await queryInterface.addColumn('Baskets', 'shopId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Shops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }

    if (!(await queryInterface.describeTable('Baskets')).hasOwnProperty('userId')) {
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
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove added columns for associations
    await queryInterface.removeColumn('Products', 'basketId');
    await queryInterface.removeColumn('Assurances', 'productId');
    await queryInterface.removeColumn('Baskets', 'shopId');
    await queryInterface.removeColumn('Baskets', 'userId');
  }
};
