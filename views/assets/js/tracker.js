let result = document.getElementById("result");
let alertBox = document.getElementById("trackerError");
let searchBtn = document.getElementById("search");
let invoiceBox = document.getElementById("invoiceBox");

result.innerHTML = `Welcome to demo mode! To view the employee dashboard, please visit the <a href="https://github.com/nlamonaco86/repairTracker" class="text-white">Github Repo</a> for more information. Otherwise, enter an Order Number to continue.`;
alertBox.classList.add("alert-success");

//LOOKUP AN ORDER
if (searchBtn){
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  result.innerHTML = "";
  invoiceBox.innerHTML = "";
  alertBox.className = "";

  let id = document.getElementById("orderNumber").value;
  if (id === "") {
    result.innerHTML = "Order Number not found! Please try again, or call 908-555-1234 for assistance."
    alertBox.classList.add("alert-danger")
  }
  else {
    // GET request
    fetch("/api/orders/" + id, { type: "GET" }).then((response) => {
      return response.json();
    })
      .then(
        function (response) {
          if (!response.error){ 
            invoiceBox.innerHTML = `<h4>Click <a id="invoiceBtn" href="../customer/invoice/${response.id}" target="_blank" class="font-weight-bold">here</a> to view your invoice</h4>`
          }
          if (response.received === 1) {
            result.innerHTML = "Your order has been received.";
            alertBox.classList.add("alert-success");
          }
          if (response.inProgress === 1) {
            result.innerHTML = "Your repair order is in progress.";
            alertBox.classList.add("alert-success");
          }
          if (response.waiting === 1) {
            result.innerHTML = "Your order is currently on hold. Please call 908-555-1234 for more information.";
            alertBox.classList.add("alert-warning");
          }
          if (response.complete === 1) {
            result.innerHTML = "Your order is ready for pickup.";
            alertBox.classList.add("alert-success");
          }
          if (response.error) {
            result.innerHTML = "Order Number not found! Please try again, or call 908-555-1234 for assistance."
            alertBox.classList.add("alert-danger")
          }
        }
      )
  }
});
}