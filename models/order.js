// Require bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Order model
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
      issue: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orderNum: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      photo: {
        type: DataTypes.STRING
      },
      received: {
        type: DataTypes.TINYINT,
        default: 1
      },
      waiting: {
        type: DataTypes.TINYINT,
        default: 0
      },
      inProgress: {
        type: DataTypes.TINYINT,
        default: 0
      },
      complete: {
        type: DataTypes.TINYINT,
        default: 0
      },
      paid: {
        type: DataTypes.TINYINT,
        default: 0
      }
  });
   // Orders belong to a Customer
   Order.associate = function (models) {
    Order.belongsTo(models.Customer, {foreignKey: 'id'});
};
// Orders can have one vehicles
Order.associate = function (models) {
    Order.hasMany(models.Vehicle, {
        foreignKey: {
            allowNull: false
        }
    });
};
  return Order;
};
