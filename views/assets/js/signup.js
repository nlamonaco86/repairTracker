// Getting references to form
let signUpForm = document.querySelector('.signup');

const checkPassword = (password) => {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (password.match(regex)) { return true }
  else { return false }
};

// When the signup button is clicked, validate the email and password are not blank
if (signUpForm) {
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let userData = {
      email: document.getElementById("email-input").value,
      // For testing purposes, this allows admin to choose a user's password, in a production version,
      // this would be omitted, and a random password would be generated server-side, hased and sent to 
      // the user as an e-mail, if we were working with real people. 
      password: document.getElementById("password-input").value,
      employee: 0,
      first: document.getElementById("first-input").value,
      last: document.getElementById("last-input").value,
      phone: document.getElementById("phone-input").value,
    };

    if (!userData.email || !userData.password || !userData.phone || !userData.first || !userData.last) {
      let signupError = document.getElementById("signupError")
      signupError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Please check the information you entered, and try again!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
    }
    // If email and password, run the signUpUser function
    else {
      if (checkPassword(userData.password) === true) {
        signUpUser(userData.email, userData.password, userData.employee, userData.first, userData.last,
          userData.phone)
      }
      else{
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

const signUpUser = (email, password, employee, first, last, phone) => {

  let newUser = {
    email: email,
    password: password,
    employee: employee,
    first: first,
    last: last,
    phone: phone
  };
  // Post to the signup route. If successful, redirect to the members page, otherwise log any errors
  fetch('../api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify(newUser),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.location.replace("/tracker");
    })
    .catch((error) => {
      let signupError = document.getElementById("signupError")
      signupError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Please check the information you entered, and try again!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
    });
};
