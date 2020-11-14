let resetForm = document.querySelector('.reset');

const forgotPassword = (email) => {
    let resetInfo = { email: email };
  
    fetch('../api/user_data/forgotpassword', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json', },
      body: JSON.stringify(resetInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.replace("/login");
      })
      .catch((error) => {
        let searchError = document.getElementById("forgotError")
        searchError.innerHTML =
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Please check your username, and try again!
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
      };
    
      if (!userData.email) {
        event.preventDefault();
        let searchError = document.getElementById("forgotError")
        searchError.innerHTML =
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Please check your username, and try again!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>`
      };
    
      // If an email and password run the loginUser function and clear the form
      forgotPassword(userData.email);
    });
    };