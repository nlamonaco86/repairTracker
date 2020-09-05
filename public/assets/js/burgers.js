// Wait to attach handlers until the DOM is fully loaded
$(function () {
  $(".change-devour").on("click", function (event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevour");

    let newDevouredState = {
      devoured: 1
    };

    //PUT
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    let newBurger = {
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      issue: $("#issue").val(),
    };

    // POST
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function (event) {
    let id = $(this).data("id");

    // DELETE
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted burger", id);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
});
