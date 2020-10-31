// Order model
module.exports = function (sequelize, DataTypes) {
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
    Order.associate = function (models) {
        Order.belongsTo(models.Vehicle, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Order.associate = function (models) {
        Order.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Order;
  };
  