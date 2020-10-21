$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  // var emailInput = $("input#email-input");
  // var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: $("input#email-input").val().trim(),
      password: $("input#password-input").val().trim(),
      first: $("input#first-input").val().trim(),
      last: $("input#last-input").val().trim(),
      position: $("input#position-input").val().trim(),
      phone: $("input#phone-input").val().trim(),
      dob: $("input#dob-input").val().trim(),
      ssn: $("input#ssn-input").val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.first, userData.last,
      userData.position,  userData.phone,  userData.dob, userData.ssn);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, first, last, position, phone, dob, ssn) {
    $.post("/api/signup", {
      email: email,
      password: password,
      first: first, 
      last: last, 
      position: position, 
      phone: phone,
      dob: dob,
      ssn: ssn
    })
      .then(function(data) {
        window.location.replace("/orders");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
