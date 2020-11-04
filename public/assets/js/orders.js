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

  // COLOR CHANGER FOR THE TRACKER PAGE
  const changeColors = (target) => {
    if (target.received === 1) {
      $("#result").text("Your order has been received.")
      $("#alert").addClass("alert-success")
    }
    if (target.inProgress === 1) {
      $("#result").text("Your repair order is in progress.")
      $("#alert").addClass("alert-success")
    }
    if (target.waiting === 1) {
      $("#result").text("Your order is currently on hold. Please call 908-555-1234 for more information.")
      $("#alert").addClass("alert-warning")
    }
    if (target.complete === 1) {
      $("#result").text("Your order is ready for pickup")
      $("#alert").addClass("alert-success")
    }
  }

  //LOOKUP AN ORDER
  $(".lookup").on("submit", function (event) {
    //prevent page reload
    event.preventDefault();
    let id = $("#orderNumber").val()
    // GET request
    $.ajax("/api/orders/" + id, {
      type: "GET"
    }).then(
      function (response) {
        console.log(response)
        $("#result").empty();
        $("#alert").removeClass();
        (response.error ? $("#result").text("Order Number not found! Please try again, or call 908-555-1234 for assistance.") && $("#alert").addClass("alert-danger") : changeColors(response))
      }
    );
  });

  // DYNAMIC MODAL
  $(".info-modal-show").on("click", function (event) {
    let id = $(this).data("id")
    // GET request
    $.ajax("/api/orders/" + id, {
      type: "GET"
    }).then(
      function (response) {
        $("#orderInfo").text("Order : " + response[0].id);
        $("#custInfo").text(response[0].firstName + " " + response[0].lastName + "'s" + " " + response[0].year + " " + response[0].make + " " + response[0].model);
        $("#issueU").text(response[0].issue);
        $("#orderID").text(response[0].id)
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
    $("#information").addClass("hide");
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

  // Populate the information card when a successful request has been received
  const populateInfoCard = (response) => {

    $("#information").removeClass("hide");
    $("#orderNumber").text(response.id);
    $("#customerName").text(response.Customer.firstName + " " + response.Customer.lastName);
    $("#invoiceBtn").attr("href", `./${response.id}`);
    $("#emailAddr").html(`<a href="mailto:${response.Customer.email}" class="text-info font-weight-bold">${response.Customer.email}</a>`);
    $("#telNum").html(`<a id="phoneNum" href="tel:${response.Customer.tel}" class="font-weight-bold text-info">${response.Customer.tel}</a>`);
    $("#addr1").text(response.Customer.addr1);
    $("#addr2").text(response.Customer.addr2);
    $("#addr3").text(response.Customer.city + " " + response.Customer.state + " " + response.Customer.zip);
    $("#orderID").text(response.id);
    $("#vehicle").text(response.year + " " + response.make + " " + response.model);
    $("#issueU").text(response.issue);

    if (response.received) {
      $("#updateInProgress").removeClass("hide");
      $("#updateWaiting").removeClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").removeClass("hide");
      $("#markPaid").addClass("hide");
    };
    if (response.waiting) {
      $("#updateInProgress").removeClass("hide");
      $("#updateWaiting").addClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").addClass("hide");
    };
    if (response.inProgress) {
      $("#updateInProgress").addClass("hide");
      $("#updateWaiting").removeClass("hide");
      $("#updateComplete").removeClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").addClass("hide");
    };
    if (response.complete) {
      $("#updateInProgress").addClass("hide");
      $("#updateWaiting").addClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").removeClass("hide");
    };
  }

  // SIDE NAVBAR ON CLICK, get an order
  $(".order").on("click", function (event) {
    event.preventDefault();

    let id = $(this).data("id");

    $.ajax("/api/orders/" + id, {
      type: "GET"
    }).then(
      function (response) {
        console.log(response);
        populateInfoCard(response);
      }
    );
  })

  // Functions to handle errors during a search
  const handlePaidError = (event) => {
    event.preventDefault();
    $("#searchError").html(
      `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>This order is paid!</strong> Please search the completed orders database.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
    $("#information").addClass("hide");
  }

  const handleSearchError = (event) => {
    event.preventDefault();
    $("#searchError").html(
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>No results found!</strong> Please try again.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
    $("#information").addClass("hide");
  }

  // Dynamic search function checks to see which term is being used to search and sends off the 
  // proper request. Nested error handling takes all situations into account 
  $(".searchForm").on("submit", function (event) {
    $("#searchError").empty();
    event.preventDefault();

    let searchType = $("#searchType").val();

    if (searchType === "Order Number") {
      let id = $("#searchTerm").val();
      $.ajax("/api/orders/" + id, {
        type: "GET"
      }).then(
        function (response) {
          if (response.error) {
            handleSearchError(event);
          }
          else if (response.paid === 1) {
            handlePaidError(event);
          }
          else { populateInfoCard(response) }
        }
      );
    }

    if (searchType === "Last Name") {
      let lastName = $("#searchTerm").val();
      $.ajax("/api/orders/named/" + lastName, {
        type: "GET"
      }).then(
        function (response) {
          if (response.error) {
            handleSearchError(event);
          }
          else if (response.paid === 1) {
            handlePaidError(event);
          }
          else {
            populateInfoCard(response)
          }
        }
      );
    };
  });

  // PRINT AN INVOICE
  $('#printInvoice').click(function () {
    window.print();
  });

});

