// Order model
module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define("Order", {
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
     vin: {
        type: DataTypes.STRING
      },
     color: {
        type: DataTypes.STRING
      },
    issue: {
      type: DataTypes.STRING,
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
    },
    inView: {
      type: DataTypes.TINYINT,
      default: 0
    }
  });
  // Order.associate = function (models) {
  //   Order.hasOne(models.Vehicle, {
  //     foreignKey:
  //     {

  //     }
  //   });
  // };
  Order.associate = function (models) {
    Order.hasOne(models.Customer, {
      foreignKey:
      {

      }
    });
  };
  return Order;
};
