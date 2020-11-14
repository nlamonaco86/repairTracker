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
        console.log('Error:', error);
      });
  };
  
  if (resetForm){
    resetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let userData = {
        email: document.getElementById("emailForgot").value,
      };
    
      if (!userData.email) {
        //error handling goes here 
        return;
      };
    
      // If an email and password run the loginUser function and clear the form
      forgotPassword(userData.email);
    });
    };