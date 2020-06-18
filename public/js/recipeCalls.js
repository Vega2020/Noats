
// spoonacular recipe retrieve function:
function getRecipe(tag) {
    var queryURL =
      "https://api.spoonacular.com/recipes/search?query=" +
      tag +
      "&number1&apiKey=c30cd056ba1c4e459950da3b71b83d82";
  
    //ajax call for recipe
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
  
      // generates a number between 1 and 10
      var random = Math.floor(Math.random() * 9) + 1;
  
      // create a url link to the address in the returned object
      var recipeLink = $("<a>").attr("href", response.results[random].sourceUrl);
      recipeLink.text(response.results[random].title);
  
      // empty the #recipe div and append the new link to it
      $("#recipe").append(recipeLink);
      $("#recipe").append("<br>");
  
      var currentRecipe = response.results[random].id;
  
      var recipePicture = `https://spoonacular.com/recipeImages/${currentRecipe}-556x370.jpg`;
  
      $("#recipe").append($("<img>").attr("src", recipePicture));
  
      // create a function to get the ingredients, with a second ajax call
      function getIngredients() {
        //create a variable for our ingredientQuery url
        var ingredientQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/ingredientWidget.json?apiKey=c30cd056ba1c4e459950da3b71b83d82`;
  
        //second ajax function for ingredients:
        $.ajax({
          url: ingredientQuery,
          method: "GET",
        }).then(function (response) {
  
          // make an li to append each ingredient and its amount and image
          response.ingredients.forEach((element) => {
            var li = $("<li>").append(
              $("<span>").text(
                element.name +
                  ":" +
                  "   " +
                  element.amount.us.value +
                  "   " +
                  element.amount.us.unit
              ),
  
              $("<img>").attr(
                "src",
                `https://spoonacular.com/cdn/ingredients_100x100/${element.image}`
              )
            );
            $("#recipe").append(li);
          });
        });
      } //closing bracket for getIngredients function
  
      //invoke getIngredients function as a step in the getRecipe function
      getIngredients();
    }); //closing bracket for getRecipe function's ajax call
  }; //closing bracket for spoonacular function