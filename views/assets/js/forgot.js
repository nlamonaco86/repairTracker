let resetForm = document.querySelector('.reset');
let forgotError = document.getElementById("forgotError")

const forgotPassword = (email, type) => {
    let resetInfo = { email: email, type: type };
    let resetMethod = type
  
    fetch('../api/user_data/forgotpassword', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json', },
      body: JSON.stringify(resetInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        forgotError.innerHTML =
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Your password has been reset! Please check your ${resetMethod}.</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
      })
      .catch((error) => {
        console.log(error)
        forgotError.innerHTML =
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>An error occured, please try again!</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
      });
  };
  
  if (resetForm){
    resetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let userData = {
        email: document.getElementById("emailForgot").value,
        type: document.getElementById("resetMethod").value,
      };
    
      if (!userData.email) {
        event.preventDefault();
        let forgotError = document.getElementById("forgotError")
        forgotError.innerHTML =
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Please check your username, and try again!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
      };
    
      // If an email and password run the loginUser function and clear the form
      forgotPassword(userData.email, userData.type);
    });
    };