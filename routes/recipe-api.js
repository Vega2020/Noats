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

  app.get("/api/noats", function(req, res) {
    db.Noats.findAll({
      include: [db.Recipes],
    }).then(function(dbNoats) {
      res.json(dbNoats);
    });
  });

  // Get route for retrieving a single post
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

  // POST route for saving a new post
  app.post("/api/recipe", function(req, res) {
    db.Recipe.create({
      recipeName: req.body.recipeName,
      queryAddress: req.body.queryAddress,
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/recipe/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // PUT route for updating posts
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