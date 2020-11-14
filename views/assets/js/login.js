// Getting references to our form and inputs
let loginForm = document.querySelector('.login');
let emailInput = document.getElementById('email-input');
let passwordInput = document.getElementById('password-input');

if (loginForm){
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let userData = {
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value
  };

  if (!userData.email || !userData.password) {
      event.preventDefault();
      let searchError = document.getElementById("loginError")
      searchError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please check your username or password, and try again!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
  }
  else { loginUser(userData.email, userData.password) };
});
};

// post the data to the server, and if it's correct, proceed
const loginUser = (email, password) => {
  let data = { email: email, password: password };

  fetch('api/login', { 
    method: 'POST', 
    headers: {'Content-Type': 'application/json', },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if(data.tempPassword === 1) { window.location.replace("/newpassword"); }
      else { window.location.replace("/orders") };
    })
    .catch((error) => {
      let searchError = document.getElementById("loginError")
      searchError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please check your username or password, and try again!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
    });
};

  