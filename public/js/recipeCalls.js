$(document).ready(function() {
  // put an event listener on the searchbutton that fires our getrecipe function and outputs the recipe
  $("#recipe-searchbutton").on("click", function() {
    $("#recipe-image-display").empty();
    $("#recipe-text-display").empty();
    getRecipe($("#recipe-searchbar").val());
  }); //closing bracket for searchbutton on click function
}); //closing bracket for document.ready function

// create an empty array for our function to push the query string to
let queryString = [];
// set the spoonacular api key as a variable so we can switch it out if we use up our quota
let spoonacularApiKey = "36fa179b399a43889f85ce0b694a5291";

// spoonacular recipe retrieve function:
function getRecipe(tag) {
  var queryURL =
    "https://api.spoonacular.com/recipes/search?query=" +
    tag +
    `&number1&apiKey=${spoonacularApiKey}`;

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
    $("#recipe-text-display").append(recipeLink);
    $("#recipe-text-display").append("<br>");
    
    //get the recipe id from the random object
    let currentRecipe = response.results[random].id;
    let recipeName = response.results[random].title;
    localStorage.setItem("recipeid", currentRecipe);
    localStorage.setItem("recipename", recipeName);
    //save the query string with the id for our database
    let buildQueryString = `https://api.spoonacular.com/recipes/informationBulk?ids=${currentRecipe}&apiKey=${spoonacularApiKey}`;
    console.log(buildQueryString);
    //empty the global queryString array before adding the new string to it
    queryString.length = 0;
    //push the queryString to the array we created at the global level.
    queryString.push(buildQueryString);
    console.log(queryString);

    // this variable is the address for the current recipe's picture
    var recipePicture = `https://spoonacular.com/recipeImages/${currentRecipe}-556x370.jpg`;

    // set a variable for the current picture
    const $recipeImage = $("<img>").attr("src", recipePicture);

    // set css styling for the variable above
    $recipeImage.css("height", "350");
    $recipeImage.css("width", "350");
    $recipeImage.css("border-radius", "100%");
    // append the styled image to the output box
    $("#recipe-image-display").append($recipeImage);

    // create a function to get the ingredients, with a second ajax call
    function getIngredients() {
      //create a variable for our ingredientQuery url
      var ingredientQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/ingredientWidget.json?apiKey=${spoonacularApiKey}`;

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
          $("#recipe-text-display").append(li);
        });
      });
    } // closing bracket for getIngredients function

    // add a third ajax call for detailed instructions
    function getInstructions() {
      var instructionQuery = `https://api.spoonacular.com/recipes/${currentRecipe}/analyzedInstructions?apiKey=${spoonacularApiKey}`;

      $.ajax({
        url: instructionQuery,
        method: "GET",
      }).then(function(response) {
        //for loop to display instructions and make an li for each step with its name and step text
        for (let i = 0; i < response[0].steps.length; i++) {
          const element = response[0].steps[i].step;
          let li = $("<li>").append(element);
          $("#recipe-text-display").append(li);
      }; //closing bracket for for loop
    }); //closing bracket for getInstructions ajax response
  
  }; //closing bracket for getInstructions function
    
    //invoke getIngredients function as a step in the getRecipe function. commented out for testing purposes.
    // getIngredients();

    //invoke getInstructions function as a step in the getRecipe function
    getInstructions();

    //invoke our queryStringTest function. when we search a recipe this should return the same recipe as a json object in our console.
    queryStringTest(queryString);
    
});//closing bracket for getRecipe function's ajax calls

};//closing bracket for getRecipe function

//test function for query string
function queryStringTest(testSearch) {
  //set our queryURL to the queryString we're going to export (which is the variable we're running through this function)
  let queryURL = testSearch;
  
  //this ajax call will return all the information for the recipe we pass through the function. We can write api routes and javascript to load this information from the database to our user's page.
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });//closing bracket for queryStringTest ajax call
};//closing bracket for queryStringTest function