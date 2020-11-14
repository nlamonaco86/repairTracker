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
    return;
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
      console.log('Error:', error);
    });
};

  