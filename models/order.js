// Order model
module.exports = function (sequelize, DataTypes) {
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
      unique: true,
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
      type: DataTypes.BOOLEAN,
      default: true
    },
    waiting: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      default: false
    },
  });
  Order.associate = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    });
};
  return Order;
};
