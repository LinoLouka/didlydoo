// {
//     "name": "Michou",
//     "dates": [
//       {
//         "date": "2022-03-17",
//         "available": true
//       },
//       {
//         "date": "2022-03-18",
//         "available": false
//       },
//       {
//         "date": "2022-03-21",
//         "available": true
//       }
//     ]
//   },


/* Variables */
const allEvents = document.getElementById("events");

/* Fonctions */
// Récupération des informations depuis l'API
function fetchData() {
    fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        displayEvents(json);
    });
}

// Création de l'html et affichage des tableaux contenant les événements
// function displayEvents(data) {
//     allEvents.innerHTML = "";
//     data.forEach((event) => {
//         const eventDiv = document.createElement("div");

//         eventDiv.innerHTML = `<h2 class="events__title">${event.name}</h2><p class="events__description">${event.description}</p><p class="events__author">${event.author}</p><button class="delete-button" data-id="${event.id}">Delete Event</button>`;
//         const table = document.createElement("table");
//         const thead = document.createElement("thead");
//         const tbody = document.createElement("tbody");
//         const tr = document.createElement("tr");
//         const th = document.createElement("th");
//         th.textContent = "Attendees\\Dates";
//         tr.appendChild(th);
//         event.dates.forEach((date) => {
//             const th = document.createElement("th");
//             th.textContent = date.date;
//             tr.appendChild(th);
//         });
//         thead.appendChild(tr);
//         table.appendChild(thead);
//         event.dates[0].attendees.forEach((attendee) => {
//             const tr = document.createElement("tr");
//             const td = document.createElement("td");
//             td.textContent = attendee.name;
//             tr.appendChild(td);
//             event.dates.forEach((date) => {
//                 const td = document.createElement("td");
//                 td.textContent = date.attendees.find((a) => a.name === attendee.name).available;
//                 tr.appendChild(td);
//             });
//             tbody.appendChild(tr);
//         });
//         table.appendChild(tbody);
//         eventDiv.appendChild(table);
//         allEvents.appendChild(eventDiv);

//         const deleteButton = eventDiv.querySelector(".delete-button");
//         deleteButton.addEventListener("click", () => {
//             const eventId = deleteButton.getAttribute("data-id");
//             deleteEvent(eventId, eventDiv);
//         });

//         const form = document.createElement("form");
//         const nameInput = document.createElement("input");
//         nameInput.type = "text";
//         nameInput.placeholder = "Nom du participant";
//         form.appendChild(nameInput);

//         const buttonDiv = document.createElement("div");
//         event.dates.forEach((date) => {
//             const yesButton = document.createElement("button");
//             yesButton.textContent = "V";
//             yesButton.addEventListener("click", (e) => {
//                 e.preventDefault();
//                 const participantName = nameInput.value;
//                 updateParticipantAvailability(event.id, event.name, participantName, date.date, true);
//             });
//             buttonDiv.appendChild(yesButton);

//             const noButton = document.createElement("button");
//             noButton.textContent = "X";
//             noButton.addEventListener("click", (e) => {
//                 e.preventDefault();
//                 const participantName = nameInput.value;
//                 updateParticipantAvailability(event.id, event.name, participantName, date.date, false);
//             });
//             buttonDiv.appendChild(noButton);
//         });

//         form.appendChild(buttonDiv);
//         eventDiv.appendChild(form);
//     });
// }

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
                td.textContent = date.attendees.find((a) => a.name === attendee.name).available;
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
            updateParticipantAvailability(event.id, participantName);
        });
        form.appendChild(submitButton);
        eventDiv.appendChild(form);
    });
    let cb1 = document.getElementById("checkbox 1");
    console.log(cb1.checked);
    console.log(cb1.name);
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

// Mise à jour de la disponibilité du participant
function updateParticipantAvailability(eventId, participantName) {
    let id = 0;
    fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
        json.forEach(obj => {
            if(obj.id === eventId){
                obj.dates.forEach(apiDate => {
                    // console.log(apiDate);
                    apiDate.attendees.forEach(attend => {
                        console.log(attend);
                        let cb = document.getElementById(`checkbox ${id}`);
                        console.log(cb.name, cb.checked);
                        id++;
                        if(attend.name === participantName){
                            console.log(eventId, participantName);
                            fetch(`http://localhost:3000/api/events/${eventId}/attend`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    name: participantName,
                                    dates: [ { date: cb.name, available: cb.checked } ]
                                })
                            })
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                            })
                            .catch((error) => {
                                console.error(
                                    "Erreur lors de la mise à jour de la disponibilité du participant :", error
                                );
                            });
                        }
                    });
                    // fetch(`http://localhost:3000/api/events/${eventId}/attendees`, {
                    //     method: "POST",
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     },
                    //     body: JSON.stringify({
                    //         name: participantName,
                    //         date: date,
                    //         available: availability
                    //     })
                    // })
                    // .then((response) => response.json())
                    // .then((json) => {
                    //     console.log(json);
                    // })
                    // .catch((error) => {
                    //     console.error(
                    //         "Erreur lors de la mise à jour de la disponibilité du participant :", error
                    //     );
                    // });
                });
            }
            else{
                console.log("ko");
            }
        });
        displayEvents(json);
    });
}

/* Appels de fonctions */
fetchData();
