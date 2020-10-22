// Customer model
module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define("Customer", {
    first: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last: {
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Customer.associate = function (models) {
    Customer.hasMany(models.Order, {
        foreignKey: {
            allowNull: false
        }
    });
  };
  return Customer;
};
