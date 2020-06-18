// create an export function that will tell sequelize how to structure our recipe table
module.exports = function(sequelize, DataTypes) {
    const Recipe = sequelize.define("Recipe", {
      // The email cannot be null, and must be a proper email before creation
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // The password cannot be null (queryAddress variable replaced "password")
      queryAddress: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    // return the finished entry for sequelize
    return Recipe;
  };// closing bracket for module.exports function
  