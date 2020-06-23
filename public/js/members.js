const db = require("../models");


$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
});
$("#saveNotes").on("click", function() {
  $.get("/api/user_data").then((data) => {
    var recipeId = localStorage.getItem("recipeid");
    var recipeName = localStorage.getItem("recipename");
    var memberId = data.id;
    const noteText = $(".note-textarea")
      .val()
      .trim();

      //Get an if here to post if there's no note existing with this user/recipe combo, or modify if there is one.
      $.post("/api/recipe", {
        recipeName: recipeName,
        queryAddress: recipeId
      })
        .then(() => {
          console.log("Recipe Added!");
          $.post("/api/noats", {
            note: noteText,
            belongsTo: recipeId,
          })
            .then(() => {
              console.log("Note Added!");
            })
        })
  });
});

$("#saveRecipe").on("click", function() {
$.get("/api/user_data").then((data) => {
  var recipeId = localStorage.getItem("recipeid");
  var recipeName = localStorage.getItem("recipename");
  console.log(recipeId, recipeName);
  $.post("/api/recipe", {
    recipeName: recipeName,
    RecipeId: recipeId,
    queryAddress: recipeId
  })
    .then(() => { console.log("Recipe Added!");});
});
});

// get saved recipes function, currently not working
function getSavedRecipes () {
  $.get("/api/recipe", function(req, res) {
    let recipeList = db.Recipe.findAll();
    console.log(recipeList);
  });
}; //closing bracket for getSavedRecipes function

getSavedRecipes();