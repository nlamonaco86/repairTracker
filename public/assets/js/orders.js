// Wait to attach handlers until the DOM is fully loaded
$(function () {
  // CREATE FUNCTION
  $(".create").on("submit", function (event) {
    event.preventDefault();
    //define a new order as an object based on input from the form
    let newOrder = {
      id: Math.floor(10000000 + Math.random() * 9000000),
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      email: $("#email").val(),
      addr1: $("#addr").val(),
      addr2: $("#addrB").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      zip: $("#zip").val(),
      vin: $("#vin").val(),
      year: $("#year").val(),
      make: $("#make").val(),
      model: $("#model").val(),
      issue: $("#issue").val(),
      photo: $("#photo").val(),
      received: 1,
      // genCustomerId: Math.floor(10000000 + Math.random() * 9000000),
      // genVehicleId: Math.floor(10000000 + Math.random() * 9000000)
    };
    // POST request
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(
      function (response) {
        if (response.err) { console.log(err) }
        // Reload the page to get the updated order list
        location.reload();
      }
    );
  });

  $(".photo-modal-show").on("click", function (event) {
    let id = $("#orderNumber").text();
    // GET request
    $.ajax("/api/orders/" + id, {
      type: "GET"
    }).then(
      function (response) {
        $("#currentPhoto").attr("src", "../assets/nophoto.png")
        $("#photoID").text(response.id)

        if (response.photo) {
          $("#currentPhoto").attr("src", response.photo);
        }

        $("#orderInfoPhoto").text("Order : " + response.id);
      }
    );
  });

  // UPDATE ISSUE FUNCTION
  $("#updateIssue").on("submit", function () {
    let id = $("#orderID").text();
    let newIssue = {
      issue: $("#issueU").val()
    }
    $.ajax("/api/orders/" + id, {
      type: "PUT",
      data: newIssue
    }).then(
      function () {
        console.log("done!")
      }
    );
  });

  //UPDATE STATUS FUNCTION
  $("#updateWaiting").on("click", function (event) {
    event.preventDefault();

    let id = $("#orderID").text();
    var newWorkState = {
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

  $("#updateInProgress").on("click", function (event) {
    event.preventDefault();
    let id = $("#orderID").text();

    var newWorkState = {
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

  $("#updateComplete").on("click", function (event) {
    event.preventDefault();
    let id = $("#orderID").text();

    var newWorkState = {
      received: 0,
      inProgress: 0,
      waiting: 0,
      complete: 0,
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

  $("#markPaid").on("click", function (event) {
    event.preventDefault();
    let id = $("#orderID").text();
    // let status = $(this).data("status")
    var newWorkState = {
      received: 0,
      inProgress: 0,
      waiting: 0,
      complete: 0,
      paid: 1
    };
    //PUT
    $.ajax("/api/orders/paid/" + id, {
      type: "PUT",
      data: newWorkState
    }).then(
      function () {
        location.reload();
      }
    );
  });

  // Handle an error if the user does not have permission to delete an order. 
  const handleDeleteError = (event) => {
    event.preventDefault();
    $("#searchError").html(
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>You don't have permission to do that! Please contact a Manager or Administrator. 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
    // $("#information").addClass("hide");
  }

  // DELETE FUNCTION
  $("#delete").on("click", function (event) {

    $.ajax("/api/user_data/", {
      type: "GET"
    }).then(function (response) {
      console.log(response.position)
      if (response.position === "Admin" || "Manager") {
        // DELETE
        let id = $("#orderID").text();

        $.ajax("/api/orders/" + id, {
          type: "DELETE"
        }).then(
          function () {
            console.log("deleted order", id);
            location.reload();
          }
        );
      }
      else {
        handleDeleteError(event);
      };
    });
  });

  // If the user is an admin, create a link to the admin page
  const personalizePage = () => {
    $.ajax("/api/user_data/", {
      type: "GET"
    }).then(function (response) {
      if (response.position === "Admin") {
        $(".theme").addClass("bg-info");
        $("#navBar").append(
          `<a class="nav-link py-2 px-0 px-lg-1 rounded js-scroll-trigger"
          href="/admin">ADMIN</a>`)
      };
    });
  }
  personalizePage();

  // SIDE NAVBAR ON CLICK, view an order
  $(".order").on("click", function (event) {
    event.preventDefault();

    let id = $(this).data("id");

    $.ajax("/api/orders/inView/" + id, {
      type: "PUT"
    }).then(
      function (response) {
        location.reload();
      }
    );
  })

  // Function to handle errors during a search
  const handleSearchError = (error, event) => {
    event.preventDefault();
    $("#searchError").html(
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>${error}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
    $("#information").addClass("hide");
  }

  // Dynamic search function checks to see which term is being used to search and sends off the 
  // proper request. Nested error handling takes different possibilities into account
  $(".searchForm").on("submit", function (event) {
    $("#searchError").empty();
    event.preventDefault();
    let id = $("#searchTerm").val();

    // check if input is a a name or number to determine which API call to make
    if ( isNaN(id) ) {
      let lastName = id
      $.ajax("/api/orders/named/" + lastName, {
            type: "GET"
          }).then(
            function (response) {
              if (response.error) {
                handleSearchError(response.error, event);
              }
              else { location.reload(); }
            }
          );
    }

    else { 
      $.ajax("/api/orders/inView/" + id, {
        type: "PUT"
      }).then(
        function (response) {
          if (response.error) {
            handleSearchError(response.error, event);
          }
          else { location.reload(); }
        }
      );
     }
  });

});

