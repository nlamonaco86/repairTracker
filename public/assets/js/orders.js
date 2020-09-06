// Wait to attach handlers until the DOM is fully loaded
$(function () {
  // CREATE FUNCTION
  $(".create").on("submit", function (event) {
    //prevent page reload
    event.preventDefault();
    //generate an 8-digit order number
    let orderNum = (Math.floor(10000000 + Math.random() * 9000000));
    //define a new order as an object based on input from the form
    let newOrder = {
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      issue: $("#issue").val(),
      orderNum: orderNum
    };
    // POST request
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(
      function () {
        // Reload the page to get the updated order list
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".complete").on("click", function (event) {
    let id = $(this).data("id");
    let newWorkState = {
      complete: 1
    };
    //PUT
    $.ajax("/api/orders/complete/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".inprogress").on("click", function (event) {
    let id = $(this).data("id");
    let newWorkState = {
      inProgress: 1
    };
    //PUT
    $.ajax("/api/orders/inProgress/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        location.reload();
      }
    );
  });
  //UPDATE FUNCTION
  $(".waiting").on("click", function (event) {
    let id = $(this).data("id");
    let newWorkState = {
      waiting: 1
    };
    //PUT
    $.ajax("/api/orders/waiting/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
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
        location.reload();
      }
    );
  });
});
