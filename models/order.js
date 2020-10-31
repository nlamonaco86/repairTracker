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
    // Order.associate = function (models) {
    //     Order.hasMany(models.Vehicle, {
    //         foreignKey: 
    //         {
    //             allowNull: false
    //         }
    //     });
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
  