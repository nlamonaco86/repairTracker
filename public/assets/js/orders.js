// Wait to attach handlers until the DOM is fully loaded
$(function () {
  // CREATE FUNCTION
  $(".create").on("submit", function (event) {
    event.preventDefault();
      //define a new order as an object based on input from the form
    let newOrder = {
      firstName: $("#firstname").val(),
      lastName: $("#lastname").val(),
      tel: $("#tel").val(),
      email: $("#email").val(),
      addr1: $("#addr1").val(),
      addr2: $("#addr2").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      zip: $("#zip").val(),
      vin: $("#vin").val(),
      year: $("#year").val(),
      make: $("#make").val(),
      model: $("#model").val(),
      issue: $("#issue").val(),
      orderNum: Math.floor(10000000 + Math.random() * 9000000),
      photo: $("#photo").val(),
      received: 1,
      genCustomerId: Math.floor(10000000 + Math.random() * 9000000),
      genVehicleId: Math.floor(10000000 + Math.random() * 9000000)
    };
    // POST request
    console.log(newOrder)
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
    console.log(target)
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
    let orderNum = $("#orderNumber").val()
    // GET request
    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        console.log(response)
        $("#result").empty();
        $("#alert").removeClass();
        if (response === null) {
          $("#result").text("Order Number not found! Please try again, or call 908-555-1234 for assistance.")
          $("#alert").addClass("alert-danger")
        }
        else {
        changeColors(response);
        }
      }
    );
  });

  // DYNAMIC MODAL
  $(".info-modal-show").on("click", function (event) {
    let orderNum = $(this).data("id")
    // GET request
    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        $("#orderInfo").text("Order : " + response[0].orderNum);
        $("#custInfo").text(response[0].firstName + " " + response[0].lastName + "'s" + " " + response[0].year + " " + response[0].make + " " + response[0].model);
        $("#issueU").text(response[0].issue);
        $("#orderID").text(response[0].id)
      }
    );
  });

  $(".photo-modal-show").on("click", function (event) {
    let orderNum = $("#orderNumber").text();
    // GET request
    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        console.log(response)
        $("#currentPhoto").attr("src", "../assets/nophoto.png")
        $("#photoID").text(response.id)

        if (response.photo) {
          $("#currentPhoto").attr("src", response.photo);
        }

        $("#orderInfoPhoto").text("Order : " + response.orderNum);
      }
    );
  });

  // UPDATE ISSUE FUNCTION
  $("#updateIssue").on("submit", function () {
    let id = $("#orderID").text();
    let newIssue = {
      issue: $("#issueU").val()
    }
    console.log(id, newIssue)
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
    console.log(id, newWorkState)
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
    console.log(id)
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

  // DELETE FUNCTION
  $("#delete").on("click", function (event) {
    let id = $("#orderID").text();
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

  const personalizePage = () => {
    $.ajax("/api/user_data/", {
      type: "GET"
    }).then(function (response) {
      console.log(response)
      if (response.position === "Admin") {
        $(".theme").addClass("bg-info");
        //fill out the user's profile section
        $("#navBar").append(
          `<a class="nav-link py-2 px-0 px-lg-1 rounded js-scroll-trigger"
          href="/admin">ADMIN</a>`)
      };

    });
  }
  personalizePage();

  const populateInfoCard = (response) => {
   const styleCard = (response) => { $("#information").removeClass("hide");
    $("#orderNumber").text(response.orderNum);
    $("#customerName").text(response.Customer.firstName + " " + response.Customer.lastName);
    $("#emailAddr").html(`<a href="mailto:${response.Customer.email}" class="text-info font-weight-bold">${response.Customer.email}</a>`);
    $("#telNum").html(`<a id="phoneNum" href="tel:${response.Customer.tel}" class="font-weight-bold text-info">${response.Customer.tel}</a>`);
    $("#addr1").text(response.Customer.addr1);
    $("#addr2").text(response.Customer.addr2);
    $("#addr3").text(response.Customer.city + " " + response.Customer.state + " " + response.Customer.zip);
    $("#orderID").text(response.id)
    $("#vehicle").text(response.year + " " + response.make + " " + response.model);
    $("#issueU").text(response.issue)};

    if (response.received) {
      $("#updateInProgress").removeClass("hide");
      $("#updateWaiting").removeClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").removeClass("hide");
      $("#markPaid").addClass("hide");
      styleCard(response);
    };
    if (response.waiting) {
      $("#updateInProgress").removeClass("hide");
      $("#updateWaiting").addClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").addClass("hide");
      styleCard(response);
    };
    if (response.inProgress) {
      $("#updateInProgress").addClass("hide");
      $("#updateWaiting").removeClass("hide");
      $("#updateComplete").removeClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").addClass("hide");
      styleCard(response);
    };
    if (response.complete) {
      $("#updateInProgress").addClass("hide");
      $("#updateWaiting").addClass("hide");
      $("#updateComplete").addClass("hide");
      $("#delete").addClass("hide");
      $("#markPaid").removeClass("hide");
      styleCard(response);
    };
  }

  // SIDE NAVBAR ON CLICK
  $(".order").on("click", function (event) {

    event.preventDefault();

    let orderNum = $(this).data("id");

    $.ajax("/api/orders/" + orderNum, {
      type: "GET"
    }).then(
      function (response) {
        populateInfoCard(response);
      }
    );
  })

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

  $(".searchForm").on("submit", function (event) {
    $("#searchError").empty();
    event.preventDefault();
    let searchType = $("#searchType").val();

    if (searchType === "Order Number") {
      let orderNum = $("#searchTerm").val();
      $.ajax("/api/orders/" + orderNum, {
        type: "GET"
      }).then(
        function (response) {
          if (response === null) { 
            handleSearchError(event);
           }
          if (response.Order.paid === 1) { 
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
          if (response === null) { 
            handleSearchError(event);
          }
          if (response.Order.paid === 1) { 
            handlePaidError(event);
          }
            else { populateInfoCard(response) }
          }
      );
    };
  });

});

