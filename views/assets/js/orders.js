// CREATE FUNCTION
let createForm = document.querySelector('.create');
if (createForm) {
  createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //define a new order as an object based on input from the form
    let newOrder = {
      id: Math.floor(10000000 + Math.random() * 9000000),
      hours: document.getElementById("hours").value,
      rate: 99,
      partsPrice: document.getElementById("partsPrice").value,
      partsNeeded: document.getElementById("partsNeeded").value,
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("lastname").value,
      tel: document.getElementById("tel").value,
      acceptSMS: document.getElementById("acceptSMS").value,
      email: document.getElementById("email").value,
      addr1: document.getElementById("addr").value,
      addr2: document.getElementById("addrB").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      vin: document.getElementById("vin").value,
      year: document.getElementById("year").value,
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      issue: document.getElementById("issue").value,
      photo: document.getElementById("photo").value,
      received: 1,
    };
    fetch('api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newOrder),
    })
      .then(response => {
        if (response.err) { console.log(err) }
        window.location.replace("/orders");
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  });
}

// Because elements are generated dynamically by Handlebars, they may not always be there. 
// If they are not, then it breaks the page, so event listeners are conditional.
let photoModal = document.querySelector('.photo-modal-show');
if (photoModal) {
  photoModal.addEventListener('click', (event) => {
    event.preventDefault();
    let photoViewer = document.getElementById("photoViewer");
    let photo = document.getElementById("photo")
    photoViewer.style = ""
  })
};

let updateIssue = document.getElementById("updateIssue");
if (updateIssue) {
  updateIssue.addEventListener('submit', (event) => {
    event.preventDefault();
    //define a new order as an object based on input from the form
    let id = document.getElementById("orderID").textContent;
    let newIssue = { 
      issue: document.getElementById("issueU").value,
      hours: document.getElementById("hoursU").value,
      partsPrice: document.getElementById("partsPriceU").value,
      partsNeeded: document.getElementById("partsNeededU").value,
     }
    fetch('api/orders/updateIssue/where/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newIssue),
    })
      .then(response => {
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  })
}

//UPDATE STATUS FUNCTIONS - COMBINE THESE 5
let updateInProgress = document.getElementById("updateInProgress");
if (updateInProgress) {
  updateInProgress.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("orderID").textContent;
    let newStatus = { received: 0, inProgress: 1, waiting: 0, complete: 0 }

    fetch('api/orders/inProgress/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newStatus),
    })
      .then(response => {
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  })
}

let updateWaiting = document.getElementById("updateWaiting");
if (updateWaiting) {
  updateWaiting.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("orderID").textContent;
    let newStatus = { received: 0, inProgress: 0, waiting: 1, complete: 0 }

    fetch('api/orders/waiting/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newStatus),
    })
      .then(response => {
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  })
}

let updateComplete = document.getElementById("updateComplete");
if (updateComplete) {
  updateComplete.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("orderID").textContent;
    let newStatus = { received: 0, inProgress: 0, waiting: 0, complete: 1 }

    fetch('api/orders/complete/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newStatus),
    })
      .then(response => {
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  })
}

let markPaid = document.getElementById("markPaid");
if (markPaid) {
  markPaid.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("orderID").textContent;
    let newStatus = { paid: 1 }

    fetch('api/orders/paid/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newStatus),
    })
      .then(response => {
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  })
}

// Handle an error if the user does not have permission to delete an order. 
const handleDeleteError = (event) => {
  event.preventDefault();
  let searchError = document.getElementById("searchError")
  searchError.innerHTML =
    `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>You don't have permission to do that! Please contact a Manager or Administrator. 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
}

// DELETE FUNCTION
let deleteBtn = document.getElementById("delete");
if (deleteBtn) {
  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();

    fetch("/api/user_data/", { type: "GET" }).then((response) => {
      return response.json();
    })
      .then(response => {
        console.log(response.position)
        if (response.position === "Admin") {
          let id = document.getElementById("orderID").textContent;
          fetch("/api/orders/delete/" + id, { method: "DELETE" }).then((response) => {
           location.reload();
          })
        }
        else { handleDeleteError(event); }
      })
  })
}

// If the user is an admin, create a link to the admin page
const personalizePage = () => {
  fetch("/api/user_data/", { type: "GET" }).then((response) => {
    return response.json();
  })
    .then(response => {
      let adminLink = document.getElementById('adminLink')
      if (response.position === "Admin") {
        if (adminLink) {
          adminLink.innerHTML = `<a class="nav-link" href="/admin">
          <i class="fas fa-fw fa-laptop"></i>
          <span>Admin</span></a>`
        }
      }
    });
}
personalizePage();

// SIDE NAVBAR ON CLICK, view an order
// getElementsByClassName returns an array of elements, so loop through each one, and add
// the event listener/function to it. all conditional of course, so an empty page doesn't fail
let orderTag = document.getElementsByClassName("order");
if (orderTag) {
  for (let i = 0; i < orderTag.length; i++) {
    orderTag[i].addEventListener('click', (event) => {
      // target the element's ID by class
      let id = orderTag[i].id
      // the view is actually an update query / set the DB record inView to true and all others to false
      fetch('api/orders/inView/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', }
      })
        .then(response => {
          location.reload();
        })
        .catch((error) => {
          console.log('Error:', error);
        });

    })
  }
}

// Function to handle errors during a search
const handleSearchError = (error, event) => {
  event.preventDefault();
  let searchError = document.getElementById("searchError")
  searchError.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>${error}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
}


// Dynamic search function checks to see which term is being used to search and sends off the 
// proper request. Nested error handling takes different possibilities into account
let searchForm = document.querySelector(".searchForm");
if (searchForm) {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let id = document.getElementById("searchTerm").value
    // check if input is a string or number to determine which API call to make
    if (isNaN(id)) {
      let lastName = id
      fetch("/api/orders/named/" + lastName, { type: "GET" }).then((response) => {
        return response.json();
      })
        .then((response) => {
          if (response.error) {
            console.log(response.error)
            handleSearchError(response.error, event);
          }
          else {
            location.reload();
            // Other orders associated with the customer will also be returned
            console.log(response.otherOrders.map(x => x.id))
          }
        }
        );
    }
    // The nested API calls above and below take care of response and error handling
    else {
      fetch('api/orders/inView/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', }
      })
        .then(response => {
          location.reload();
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  });
};

// Functions to edit Customer information on the fly

// To cancel an edit, just reload the page
let escBtn = document.querySelector("#escBtn");
if (escBtn) {
  escBtn.addEventListener('click', (event) => {
    location.reload();
  })
}

// populate a form with the current information - user can then edit the info, and click save to submit to the database
let saveBtn = document.querySelector("#saveBtn");
if (saveBtn) {
  saveBtn.addEventListener('click', (event) => {
    let customerId = document.getElementById("editCustomerId").textContent;
    let editedInfo = {
      customerId: document.getElementById("editCustomerId").textContent,
      firstName: document.getElementById("editFirstname").value,
      lastName: document.getElementById("editLastname").value,
      email: document.getElementById("editEmail").value,
      tel: document.getElementById("editTel").value,
      addr1: document.getElementById("editAddr1").value,
      addr2: document.getElementById("editAddr2").value,
      city: document.getElementById("editCity").value,
      zip: document.getElementById("editZip").value
    };
    fetch('customer-api/update/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(editedInfo),
    })
      .then(response => {
        if (response.err) { console.log(err) }
        location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  });
};

let customerCardBtn = document.querySelector("#customerCardBtn");
if (customerCardBtn) {
  customerCardBtn.addEventListener('click', (event) => {
    let orderID = document.getElementById("orderID").textContent;
    let firstName = document.getElementById("fN").textContent;
    let lastName = document.getElementById("lN").textContent;
    let email = document.getElementById("custEmail").textContent;
    let tel = document.getElementById("custTel").textContent;
    let addr1 = document.getElementById("caddr1").textContent;
    let addr2 = document.getElementById("caddr2").textContent;
    let city = document.getElementById("cCity").textContent;
    let zip = document.getElementById("cZip").textContent;

    saveBtn.style.removeProperty('display');
    escBtn.style.removeProperty('display');
    customerCardBtn.style.display = 'none';

    document.getElementById("customerCard").innerHTML =
      `<h4 class="card-title">Order #<span>${orderID}</span></h4>
    <form class="edit">
    <div class="form-row">
      <div class="form-group col-md-6">
        <input type="text" class="" id="editFirstname" value="${firstName}"></input>
      </div>
      <div class="form-group col-md-6">
      <input type="text" class="" id="editLastname" value="${lastName}"></input>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <input type="email" class="" id="editEmail" value="${email}"></input>
      </div>
      <div class="form-group col-md-6">
       <input type="text" class="" id="editTel" pattern="[0-9]{10}" value="${tel}"></input>
      </div>
    </div>
    <div class="form-group">
      <input type="text" class="" id="editAddr1" value="${addr1}"></input>
    </div>
    <div class="form-group">
      <input type="text" class="" id="editAddr2" value="${addr2}"></input>
    </div>
    <div class="form-row">
      <div class="form-group col-md-5">
         <input type="text" class="" id="editCity" value="${city}"></input>
      </div>
      <div class="form-group col-md-3">
        <select id="editState" class="">
          <option>CT</option>
          <option>DE</option>
          <option>MA</option>
          <option>MD</option>
          <option>ME</option>
          <option>NH</option>
          <option selected>NJ</option>
          <option>NY</option>
          <option>PA</option>
          <option>VT</option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <input type="text" class="" id="editZip" value="${zip}"></input>
      </div>
    </div>
    <div class="d-flex justify-content-around">
  </div>
</form>`
  })
};