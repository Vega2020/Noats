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
    console.log(memberId, noteText);
  });
});
