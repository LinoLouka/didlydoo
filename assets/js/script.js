const allEvents = document.getElementById("events");

function fetchData() {
  fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      displayEvents(json);
    });
}

function displayEvents(data) {
  data.forEach((event) => {
    const eventDiv = document.createElement("div");

    eventDiv.innerHTML = `<h2 class="events__title">${event.name}</h2><p class="events__description">${event.description}</p><p class="events__author">${event.author}</p><button class="events__edit-button edit-button" data-id="${event.id}">Edit Event</button><button class="events__delete-button delete-button" data-id="${event.id}">Delete Event</button>`;
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Attendees\\Dates";
    tr.appendChild(th);
    event.dates.forEach((date) => {
      const th = document.createElement("th");
      th.textContent = date.date;
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    event.dates[0].attendees.forEach((attendee) => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = attendee.name;
      tr.appendChild(td);
      event.dates.forEach((date) => {
        const td = document.createElement("td");
        td.textContent = date.attendees.find(
          (a) => a.name === attendee.name
        ).available;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    eventDiv.appendChild(table);
    allEvents.appendChild(eventDiv);

    const editButton = eventDiv.querySelector(".events__edit-button");
    editButton.addEventListener("click", () => {
      const eventId = editButton.getAttribute("data-id");
      editEvent(eventId);
    });
  });
}

function editEvent(eventId) {
  fetch(`http://localhost:3000/api/events/${eventId}`)
    .then((response) => response.json())
    .then((event) => {
      displayEditForm(event);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de l'événement :", error);
    });
}

// Display de la fonction d'edit
function displayEditForm(event) {
  const eventDiv = document.getElementById("event-details");
  eventDiv.innerHTML = `
    <h2>Edit Event</h2>
    <form id="edit-form">
      <label for="name">Name:</label>
      <input type="text" id="name" value="${event.name}" required>
      
      <label for="description">Description:</label>
      <textarea id="description" required>${event.description}</textarea>
      
      <label for="author">Author:</label>
      <input type="text" id="author" value="${event.author}" required>
      
      <button type="submit">Save Changes</button>
    </form>
  `;

  const editForm = document.getElementById("edit-form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = document.getElementById("name").value;
    const newDescription = document.getElementById("description").value;
    const newAuthor = document.getElementById("author").value;
    updateEvent(event.id, newName, newDescription, newAuthor);
  });
}

// Fonction d'edit
function updateEvent(eventId, newName, newDescription, newAuthor) {
  const updatedEvent = {
    name: newName,
    description: newDescription,
    author: newAuthor,
  };

  fetch(`http://localhost:3000/api/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      if (response.ok) {
        fetchData();
      } else {
        console.error("Error updating the event");
      }
    })
    .catch((error) => {
      console.error("Error updating the event:", error);
    });
}
// Fonction de suppression
function deleteEvent(eventId, eventDiv) {
  fetch(`http://localhost:3000/api/events/${eventId}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        eventDiv.remove();
      } else {
        console.error("Erreur lors de la suppression de l'événement");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'événement :", error);
    });
}

fetchData();
