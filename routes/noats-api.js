const db = require("../models");

module.exports = function(app) {
  app.get("/api/noats", function(req, res) {
    var query = {};
    if (req.query.note) {
      query.RecipeId = req.query.note;
    }

    db.Recipe.findAll({
      where: query,
      include: [db.Recipe],
    }).then(function(result) {
      res.json(result);
    });
  });

  //   app.get("/api/noats", function(req, res) {
  //     db.Noats.findAll({
  //       include: [db.Recipes],
  //     }).then(function(dbNoats) {
  //       res.json(dbNoats);
  //     });
  //   });

  app.get("/api/noats/:id", function(req, res) {
    db.Noats.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Recipes],
    }).then(function(dbNoats) {
      res.json(dbNoats);
    });
  });

  app.post("/api/noats", function(req, res) {
    db.Noats.create({
      note: req.body.note,
      RecipeId: req.body.RecipeId
    }).then(function(result) {
      res.json(result);
    });
  });

  app.delete("/api/noats/:id", function(req, res) {
    db.Noats.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbNoats) {
      res.json(dbNoats);
    });
  });
};
