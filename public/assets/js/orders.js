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
      year: $("#year").val(),
      make: $("#make").val(),
      model: $("#model").val(),
      issue: $("#issue").val(),
      orderNum: genNum,
      photo: $("#photo").val()
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

  // COLOR CHANGER FOR THE TRACKER PAGE
  const changeColors = (target) => {
    console.log(target[0])
    if (target[0].received === 1){   
      $("#result").text("Your order has been received.")
      $("#alert").addClass("alert-success")
    }
    if (target[0].inProgress === 1){
      $("#result").text("Your repair order is in progress.")
      $("#alert").addClass("alert-success")
    }
    if (target[0].waiting === 1){
      $("#result").text("Your order is currently on hold. Please call 908-555-1234 for more information.")
      $("#alert").addClass("alert-warning")
    }
    if (target[0].complete === 1){
      $("#result").text("Your order is ready for pickup")
      $("#alert").addClass("alert-success")
    }
  }

  // DYNAMIC MODAL
  $(".info-modal-show").on("click", function (event) {
      let orderNum = $(this).data("id")
    // GET request
    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        $("#orderInfo").text("Order : " + response[0].orderNum);
        $("#custInfo").text(response[0].firstName +" "+ response[0].lastName +"'s" +" "+ response[0].year +" "+ response[0].make +" "+ response[0].model);
        $("#issueU").text(response[0].issue);
        $("#orderID").text(response[0].id)
      }
    );
  });

  $(".photo-modal-show").on("click", function (event) {
    let orderNum = $(this).data("id")
  // GET request
  $.ajax("/api/orders/" + orderNum, {
    type: "GET"
  }).then(
    function (response) {
      $("#currentPhoto").attr("src", "../assets/nophoto.png")
      $("#photoID").text(response[0].id)

      if (response[0].photo) {
        $("#currentPhoto").attr("src", response[0].photo);
      }

      $("#orderInfoPhoto").text("Order : " + response[0].orderNum);
    }
  );
});

  // UPDATE ISSUE FUNCTION
  $(".updateIssue").on("submit", function (event) {
    event.preventDefault();
    let id = $("#orderID").text();
    let newIssue = {
      issue: $("#issueU").val()
    }
    $.ajax("/api/orders/" + id, {
      type: "PUT",
      data: newIssue
    }).then(
      function () {
        location.reload();
      }
    );
  });


  //UPDATE STATUS FUNCTION
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
  //UPDATE STATUS FUNCTION
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
  //UPDATE STATUS FUNCTION
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
  //LOOKUP AN ORDER
  $(".lookup").on("submit", function (event) {
    //prevent page reload
    event.preventDefault(); 
      let orderNum= $("#orderNumber").val()
    // GET request
    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        $("#result").empty();
        $("#alert").removeClass();
        changeColors(response);
      }
    );
  });

});
