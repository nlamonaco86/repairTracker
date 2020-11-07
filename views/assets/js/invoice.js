// Wait to attach handlers until the DOM is fully loaded
$(function () {

    $(".email").on("click", function (event) {
      let id = $(this).data("id");
      $.ajax("/api/email/invoice/" + id, {
        type: "GET"
      }).then(function (response) {
        console.log(response)
      });
    });
     
    // PRINT AN INVOICE
    $('#printInvoice').click(function () {
      window.print();
    });
  
  });
  
  