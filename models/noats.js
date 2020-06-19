module.exports = function(sequelize, DataTypes) {
  const Noats = sequelize.define("Noats", {
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
<<<<<<< HEAD
        len: 1,
      },
    },
=======
        len: 1
      }
    }
>>>>>>> 5242309d91627d6a69b620076ebdfd1a919bfd8a
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
