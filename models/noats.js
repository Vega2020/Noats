module.exports = function(sequelize, DataTypes) {
  const Noats = sequelize.define("Noats", {
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1,
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
    },
  });

// //  Noats.associate = function(models) {
//     Noats.belongsTo(models.Recipe, {
//       foreignKey: {
//         allowNull: false,
//       },
//     });
// //  };

  return Noats;
};
