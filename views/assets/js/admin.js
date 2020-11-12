// Getting references to form
let signUpForm = document.querySelector('.signup');

// When the signup button is clicked, validate the email and password are not blank
if (signUpForm) {
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let userData = {
    email: document.getElementById("email-input").value,
    password: document.getElementById("password-input").value,
    first: document.getElementById("first-input").value,
    last: document.getElementById("last-input").value,
    position: document.getElementById("position-input").value,
    phone: document.getElementById("phone-input").value,
    dob: document.getElementById("dob-input").value,
    ssn: document.getElementById("ssn-input").value,
  };

  if (!userData.email || !userData.password) {
    return;
  }
  // If email and password, run the signUpUser function
  signUpUser(userData.email, userData.password, userData.first, userData.last,
    userData.position, userData.phone, userData.dob, userData.ssn);
    document.getElementById("email-input").value = "";
    document.getElementById("password-input").value = "";
});
};

const signUpUser = (email, password, first, last, position, phone, dob, ssn) => {
  
  let newUser = { email: email,
    password: password,
    first: first,
    last: last,
    position: position,
    phone: phone,
    dob: dob,
    ssn: ssn 
  };
// Post to the signup route. If successful, redirect to the members page, otherwise log any errors
  fetch('api/signup', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(newUser),
  })
    .then(response => response.json())
    .then(data => {
      window.location.replace("/orders");
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};
