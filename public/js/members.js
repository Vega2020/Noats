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
      $.get("/api/noats").then(data => {
        console.log(data);
      });

      // if (noats_db.noats.count({where: {RecipeId: 1} })
      // .then(count =>{
      //   if (count!= 0){
      //     return false;
      //   }
      //   return true;
      //   })){
      //     console.log("thing")
      //   }
      //   else{
          
      //           $.post("/api/noats", {
      //             note: noteText,
      //             memberId: memberId,
      //             RecipeId: 1 //fill Id here
      //           })
      //             .then(() => {
      //               console.log("Fill");
      //             })
      //         console.log(memberId, noteText, RecipeId);

      //   }
  });
});