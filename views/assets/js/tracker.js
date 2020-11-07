// Wait to attach handlers until the DOM is fully loaded
$(function () {
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
  });
  
  