// Wait to attach handlers until the DOM is fully loaded
$(function () {
  // CREATE FUNCTION
  $(".create").on("submit", function (event) {
    //prevent page reload
    event.preventDefault();   
    let genNum = (Math.floor(10000000 + Math.random() * 9000000)) 
    //define a new order as an object based on input from the form
    let newOrder = {
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      email: $("#email").val(),
      issue: $("#issue").val(),
      orderNum: genNum
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
      received: 0,
      inProgress: 0,
      waiting: 0,
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
      received: 0,
      inProgress: 1,
      waiting: 0,
      complete: 0
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
      received: 0,
      inProgress: 0,
      waiting: 1,
      complete: 0
    };
    //PUT
    $.ajax("/api/orders/waiting/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        console.log("click")
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
