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
    // console.log(data);
    allEvents.innerHTML += `<h2 class="events__title">${event.name} </h2><p class="events__description">${event.description}</p><p class="events__author">${event.author}</p><button class="delete-button">Delete Event</button>`;
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
    allEvents.appendChild(table);
  });
  const deleteButton = eventDiv.querySelector(".delete-button"); // Select the delete button
  deleteButton.addEventListener("click", () => {
    deleteEvent(eventDiv); // Call deleteEvent function when clicked
  });
}
//Add remove Event
function deleteEvent(eventDiv) {
  eventDiv.parentNode.removeChild(eventDiv);
}

fetchData();
