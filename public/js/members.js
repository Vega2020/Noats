$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
});
$("#saveNotes").on("click", function() {
  $.get("/api/user_data").then((data) => {
    var memberId = data.id;
    const noteText = $(".note-textarea")
      .val()
      .trim();

      //Get an if here to post if there's no note existing with this user/recipe combo, or modify if there is one.

      $.post("/api/noats", {
        note: noteText,
        memberId: memberId,
        RecipeId: 1 //fill Id here
      })
        .then(() => {
          console.log("Fill");
        })
    console.log(memberId, noteText, RecipeId);
  });
});
