module.exports = function(sequelize, DataTypes) {
  const Noats = sequelize.define("Noats", {
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });

  Noats.associate = function(models) {
    Noats.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Noats;
};
