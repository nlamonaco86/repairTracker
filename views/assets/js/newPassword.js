// Getting references to our form and inputs
let newPasswordForm = document.querySelector('.newPasswordForm');
let newPassword = document.getElementById('newPassword');
let confirmNewPassword = document.getElementById('confirmNewPassword');

if (newPasswordForm){
newPasswordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let userData = {
    email: document.getElementById('userEmail').textContent,
    password: document.getElementById('newPassword').value,
    confirmPassword: document.getElementById('confirmNewPassword').value
  };

  if (userData.confirmPassword !== userData.password) {
    event.preventDefault();
    let searchError = document.getElementById("newpasswordError")
    searchError.innerHTML =
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Please check your password, and try again!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
  };

  changePassword(userData.email, userData.password);
});
};

// post the data to the server, and if it's correct, proceed
const changePassword = (email, password) => {
  let data = { email: email, password: password };

  fetch('../api/user_data/changepassword', { 
    method: 'PUT', 
    headers: {'Content-Type': 'application/json', },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      if(data.error) { console.log(error) }
      else { window.location.replace("/") };
    })
    .catch((error) => {
      let searchError = document.getElementById("newpasswordError")
      searchError.innerHTML =
        `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please check your password, and try again!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
    });
};

  