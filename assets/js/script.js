import { createEvent } from "./create_event.js";
const allEvents = document.getElementById("events");
const btn = document.querySelector(".header__btn");

function fetchData() {
    fetch("http://localhost:3000/api/events/")
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            displayEvents(json);
        });
}

fetchData();

btn.addEventListener("click", createEvent);

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
            console.error(
                "Erreur lors de la suppression de l'événement :",
                error
            );
        });
}

function displayEvents(data) {
    allEvents.innerHTML = "";
    let id = 0;
    data.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.innerHTML = `<h2 class="events__title">${event.name}</h2><p class="events__description">${event.description}</p><p class="events__author">${event.author}</p><button class="delete-button" data-id="${event.id}">Delete Event</button>`;
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

        const deleteButton = eventDiv.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            const eventId = deleteButton.getAttribute("data-id");
            deleteEvent(eventId, eventDiv);
        });

        const form = document.createElement("form");
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Nom du participant";
        form.appendChild(nameInput);

        const checkboxDiv = document.createElement("div");
        event.dates.forEach((apiDate) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("id", `checkbox ${id}`);
            id++;
            checkbox.name = `${apiDate.date}`;
            // checkbox.addEventListener("change", () => {
            //     const participantName = nameInput.value;
            //     const isAvailable = checkbox.checked;
            //     updateParticipantAvailability(event.id, participantName, apiDate, isAvailable);
            // });
            checkboxDiv.appendChild(checkbox);
        });

        form.appendChild(checkboxDiv);
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const participantName = nameInput.value;
            // updateParticipantAvailability(event.id, participantName);
        });
        form.appendChild(submitButton);
        eventDiv.appendChild(form);
    });
    let cb1 = document.getElementById("checkbox 1");
    console.log(cb1.checked);
    console.log(cb1.name);
}
