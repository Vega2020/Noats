$(document).ready(function() {
  // put an event listener on the searchbutton that fires our getrecipe function and outputs the recipe
  $("#recipe-searchbutton").on("click", function() {
    $("#recipe-output").empty();
    getRecipe($("#recipe-searchbar").val());
  }); //closing bracket for searchbutton on click function
}); //closing bracket for document.ready function

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
  }).then(function(response) {

    // generates a number between 1 and 10
    var random = Math.floor(Math.random() * 9) + 1;

    // create a url link to the address in the returned object
    var recipeLink = $("<a>").attr("href", response.results[random].sourceUrl);
    recipeLink.text(response.results[random].title);

    // empty the #recipe div and append the new link to it
    $("#recipe-output").append(recipeLink);
    $("#recipe-output").append("<br>");

    var currentRecipe = response.results[random].id;

    var recipePicture = `https://spoonacular.com/recipeImages/${currentRecipe}-556x370.jpg`;

    $("#recipe-output").append($("<img>").attr("src", recipePicture));

    // create a function to get the ingredients, with a second ajax call
    function getIngredients() {
      //create a variable for our ingredientQuery url
      var ingredientQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/ingredientWidget.json?apiKey=c30cd056ba1c4e459950da3b71b83d82`;

      //second ajax function for ingredients:
      $.ajax({
        url: ingredientQuery,
        method: "GET",
      }).then(function(response) {
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
          $("#recipe-output").append(li);
        });
      });
    } // closing bracket for getIngredients function

    // add a third ajax call for detailed instructions
    function getInstructions() {
      var instructionQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/analyzedInstructions?apiKey=c30cd056ba1c4e459950da3b71b83d82`;

      $.ajax({
        url: instructionQuery,
        method: "GET",
      }).then(function(response) {
        //for loop to display instructions and make an li for each step with its name and step text
        for (let i = 0; i < response[0].steps.length; i++) {
          const element = response[0].steps[i].step;
          let li = $("<li>").append(element);
          $("#recipe-output").append(li);
      }; //closing bracket for for loop
    }); //closing bracket for getInstructions ajax response
  
  }; //closing bracket for getInstructions function
    
    //invoke getIngredients function as a step in the getRecipe function. commented out for testing purposes.
    // getIngredients();

    //invoke getInstructions function as a step in the getRecipe function
    getInstructions();
    
});

};//closing bracket for getRecipe function