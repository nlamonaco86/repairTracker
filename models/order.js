// Require bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Order model
module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
    // The email cannot be null, and must be a proper email before creation
    firstName: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
      }
  });
  return Order;
};
