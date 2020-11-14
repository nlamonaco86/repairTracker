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
    return;
  };

  // If an email and password run the loginUser function and clear the form
  loginUser(userData.email, userData.password);
  emailInput.innerHTML = "";
  passwordInput.innerHTML = "";
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
      window.location.replace("/orders");
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};

  