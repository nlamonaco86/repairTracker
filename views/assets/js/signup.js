// Getting references to form
let signUpForm = document.querySelector('.signup');

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

  if (!userData.email || !userData.password) {
    return;
  }
  // If email and password, run the signUpUser function
  signUpUser(userData.email, userData.password, userData.employee, userData.first, userData.last,
    userData.phone);
    document.getElementById("email-input").value = "";
    document.getElementById("password-input").value = "";
});
};

const signUpUser = (email, password, employee, first, last, phone) => {
  
  let newUser = { email: email,
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
      window.location.replace("/tracker");
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};
