// Wait to attach handlers until the DOM is fully loaded
$(function () {
// CREATE FUNCTION
  $(".create").on("submit", function (event) {
    event.preventDefault();

    let newOrder = {
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      issue: $("#issue").val(),
    };

    // POST
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(
      function () {
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".complete").on("click", function (event) {
    let id = $(this).data("id");
    let newWork = $(this).data("newwork");

    let newWorkState = {
      complete: 1
    };

    //PUT
    $.ajax("/api/orders/complete/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        console.log("changed work to", newWork);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".inprogress").on("click", function (event) {
    let id = $(this).data("id");
    let newWork = $(this).data("newwork");

    let newWorkState = {
      inProgress: 1
    };

    //PUT
    $.ajax("/api/orders/inProgress/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        console.log("changed status to", newWork);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".waiting").on("click", function (event) {
    let id = $(this).data("id");
    let newWork = $(this).data("newwork");

    let newWorkState = {
      waiting: 1
    };
    //PUT
    $.ajax("/api/orders/waiting/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        console.log("changed status to", newWork);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
// DELETE FUNCTION
  $(".delete").on("click", function (event) {
    let id = $(this).data("id");

    // DELETE
    $.ajax("/api/orders/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted order", id);
        // Reload the page to get the updated burger list
        location.reload();
      }
    );
  });
});
