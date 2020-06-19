module.exports = function(sequelize, DataTypes) {
  const Noats = sequelize.define("Noats", {
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: 1
      }
    },
    //user ID should go here?
  });

  Noats.associate = function(models) {
    Noats.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Noats;
};
