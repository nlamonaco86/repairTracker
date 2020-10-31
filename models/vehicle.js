// Vehicle model
module.exports = function (sequelize, DataTypes) {
    const Vehicle = sequelize.define("Vehicle", {
      // The email cannot be null, and must be a proper email before creation
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
      }
    });
    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.Order, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    Vehicle.associate = function (models) {
        Vehicle.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Vehicle;
  };
  