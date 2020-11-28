// Getting references to form
let adminSignUpForm = document.querySelector('.adminSignup');

const checkRegex = (password) => {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (password.match(regex)) { return true }
  else { return false }
};

// When the signup button is clicked, validate the email and password are not blank
if (adminSignUpForm) {
  adminSignUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let userData = {
      email: document.getElementById("email-input").value,
      // For testing purposes, this allows admin to choose a user's password, in a production version,
      // this would be omitted, and a random password would be generated server-side, hased and sent to 
      // the user as an e-mail, if we were working with real people. 
      password: document.getElementById("password-input").value,
      employee: 1,
      first: document.getElementById("first-input").value,
      last: document.getElementById("last-input").value,
      position: document.getElementById("position-input").value,
      phone: document.getElementById("phone-input").value,
      dob: document.getElementById("dob-input").value,
      ssn: document.getElementById("ssn-input").value,
    };

    if (!userData.email || !userData.password || !userData.first || !userData.last || !userData.phone || !userData.position || !userData.ssn || !userData.dob) {
      let searchError = document.getElementById("adminSignupError")
      searchError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Please check the information you entered, and try again!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    }
    else {
      if (checkPassword(userData.password) === true) {
        adminSignUp(userData.email, userData.password, userData.employee, userData.first, userData.last,
          userData.position, userData.phone, userData.dob, userData.ssn);
      }
      else {
        signupError.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Passwords must contain between 6 to 20 characters and contain at least one number, one uppercase and one lowercase letter.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
      }
    }
  });
};

const adminSignUp = (email, password, employee, first, last, position, phone, dob, ssn) => {

  let newUser = {
    email: email,
    password: password,
    employee: employee,
    first: first,
    last: last,
    position: position,
    phone: phone,
    dob: dob,
    ssn: ssn
  };
  // Post to the signup route. If successful, redirect to the members page, otherwise log any errors
  fetch('../api/signup', {
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
