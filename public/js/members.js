$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });
});
$("#saveNotes").on("click", function() {
  $.get("/api/user_data").then((data) => {
    memberId = data.id;
    const noteText = $(".note-textarea")
      .val()
      .trim();
      $.post("/api/noats", { //update this route
        noteText: noteText,
        memberId: memberId,
        recipeId: 1 //fill Id here
      })
        .then(() => {
          console.log("Fill");
        })
    console.log(memberId, noteText);
  });
});
