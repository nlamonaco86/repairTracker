// Customer model
module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define("Customer", {
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
      },
      addr1: {
        type: DataTypes.STRING,
      },
      addr2: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      zip: {
        type: DataTypes.STRING,
      }
    });
    Customer.associate = function (models) {
      Customer.hasMany(models.Order, {
        foreignKey:
        {
  
        }
      });
    };
    return Customer;
  };
  