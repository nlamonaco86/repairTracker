// Vehicle model
module.exports = function(sequelize, DataTypes) {
  const Vehicle = sequelize.define("Vehicle", {
  //   year: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   make: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //   model: {
  //     type: DataTypes.STRING,
  //     allowNull: false
  //   },
  //  vin: {
  //     type: DataTypes.STRING
  //   },
  //  color: {
  //     type: DataTypes.STRING
  //   }
  });
   // Vehicle can have many orders (sometimes you get a lemon...)
//    Vehicle.associate = function (models) {
//     Vehicle.belongsTo(models.Order, {
//         foreignKey: {
//             allowNull: false
//         }
//     });
// };
  return Vehicle;
};
