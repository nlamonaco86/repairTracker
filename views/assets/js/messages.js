// SIDE NAVBAR ON CLICK, view an message
// getElementsByClassName returns an array of elements, so loop through each one, and add
// the event listener/function to it. all conditional of course, so an empty page doesn't fail
let messageTag = document.getElementsByClassName("msgTag");
if (messageTag) {
  for (let i = 0; i < messageTag.length; i++) {
    messageTag[i].addEventListener('click', (event) => {
        event.preventDefault();
      // target the element's ID by class
      let id = messageTag[i].id
      // the view is actually an update query / set the DB record inView to true and all others to false
      fetch('../api/messages/inView/' + id, {
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
};

// MARK UNREAD
let markUnread = document.getElementById("markUnread");
if (markUnread) {
  markUnread.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("msgID").textContent;
    let newStatus = { unread: 1, seen: 0 }

    fetch('../api/messages/markUnread/' + id, {
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

// MARK UNREAD
let markRead = document.getElementById("markRead");
if (markRead) {
  markRead.addEventListener('click', (event) => {
    event.preventDefault();
    let id = document.getElementById("msgID").textContent;
    //ORM does the actual work, this is here for future changes/refactoring
    let newStatus = { unread: 1, seen: 0 }

    fetch('../api/messages/markRead/' + id, {
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