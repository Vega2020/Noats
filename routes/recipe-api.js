var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the posts
  //   app.get("/api/recipe", function(req, res) {
  //     var query = {};
  //     if (req.query.note) {
  //       query.RecipeId = req.query.note;
  //     }

  //     db.Recipe.findAll({
  //       where: query,
  //       include: [db.Noats],
  //     }).then(function(dbRecipe) {
  //       res.json(dbRecipe);
  //     });
  //   });

  app.get("/api/recipe", function(req, res) {
    db.Recipe.findAll({
      include: [db.Noats],
    }).then(function(dbNoats) {
      res.json(dbNoats);
    });
  });

  // Get route for retrieving a single recipe and its notes
  app.get("/api/recipe/:id", function(req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Noats],
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // POST route for saving a new recipe name and address
  app.post("/api/recipe", function(req, res) {
    db.Recipe.create({
      recipeName: req.body.recipeName,
      queryAddress: req.body.queryAddress,
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting a recipe
  app.delete("/api/recipe/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // PUT route for updating
  app.put("/api/recipe", function(req, res) {
    db.Recipe.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
};
