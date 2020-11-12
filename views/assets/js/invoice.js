// Because elements are generated dynamically by Handlebars, they may not always be there. 
// If they are not, then it breaks the page, so event listeners are conditional.

let printBtn = document.querySelector("#printInvoice");
let emailBtn = document.querySelector(".email");

if (printBtn){
printBtn.addEventListener("click", () => {
  window.print();
}); 
};

if (emailBtn){
emailBtn.addEventListener("click", () => {
  let id = emailBtn.getAttribute("data-id");
  fetch("/api/email/invoice/" + id, {type: "GET"}).then((response) => {
    return response.json();
  })
  .then(function (body) {
    console.log(body)
  });
});
};