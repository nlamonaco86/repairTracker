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

let closeBtn = document.getElementById('close');
if (closeBtn) {
 closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let photoViewer = document.getElementById("photoViewer");
    photoViewer.style = "display: none;"
  })
};

let updateIssue = document.getElementById("updateIssue");
if (updateIssue) {
  updateIssue.addEventListener('submit', (event) => {
    event.preventDefault();
    //define a new order as an object based on input from the form
    let id = document.getElementById("orderID").textContent;
    let newIssue = { issue: document.getElementById("issueU").value }
    fetch('api/orders/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newIssue),
    })
      .then(response => {
        window.reload();
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
    let newStatus = { received: 0, inProgress: 0, waiting: 0, complete: 0, paid: 0 }

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
          fetch("/api/orders/" + id, { method: "DELETE" }).then((response) => {
            event.preventDefault();
            console.log(response)
            console.log("deleted order", id);
            // location.reload();
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
      (response.position === "Admin" ? document.getElementById('adminLink').innerHTML = `<a class="nav-link py-2 px-0 px-lg-1 rounded js-scroll-trigger" href="/admin">ADMIN</a>` : "")
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
      }).then((response) => {
        return response.json();
      })
        .then(response => {
          console.log(response)
          if (response.error) {
            handleSearchError(response.error, event);
          }
          else { location.reload(); }
        }
        );
    }
  });
};