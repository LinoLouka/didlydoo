// /* Variables */
// const allEvents = document.getElementById("events");

// /* Fonctions */
// // Récupération des informations depuis l'API
// function fetchData() {
//   fetch("http://localhost:3000/api/events/")
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json);
//       displayEvents(json);
//     });
// }

// // Création de l'html et affichage des des tableaux contenant les évènements
// function displayEvents(data) {
//   data.forEach((event) => {
//     const eventDiv = document.createElement("div");

//     eventDiv.innerHTML = `<h2 class="events__title">${event.name}</h2><p class="events__description">${event.description}</p><p class="events__author">${event.author}</p><button class="delete-button" data-id="${event.id}">Delete Event</button>`;
//     const table = document.createElement("table");
//     const thead = document.createElement("thead");
//     const tbody = document.createElement("tbody");
//     const tr = document.createElement("tr");
//     const th = document.createElement("th");
//     th.textContent = "Attendees\\Dates";
//     tr.appendChild(th);
//     event.dates.forEach((date) => {
//         const th = document.createElement("th");
//         th.textContent = date.date;
//         tr.appendChild(th);
//     });
//     thead.appendChild(tr);
//     table.appendChild(thead);
//     event.dates[0].attendees.forEach((attendee) => {
//         const tr = document.createElement("tr");
//         const td = document.createElement("td");
//         td.textContent = attendee.name;
//         tr.appendChild(td);
//         event.dates.forEach((date) => {
//             const td = document.createElement("td");
//             td.textContent = date.attendees.find(
//                 (a) => a.name === attendee.name
//             ).available;
//             tr.appendChild(td);
//         });
//         tbody.appendChild(tr);
//     });
//     table.appendChild(tbody);
//     eventDiv.appendChild(table);
//     allEvents.appendChild(eventDiv);

//     const deleteButton = eventDiv.querySelector(".delete-button");
//     deleteButton.addEventListener("click", () => {
//         const eventId = deleteButton.getAttribute("data-id");
//         deleteEvent(eventId, eventDiv);
//     });
//   });
// }

// // Fonction de suppression
// function deleteEvent(eventId, eventDiv) {
//     fetch(`http://localhost:3000/api/events/${eventId}`, { method: "DELETE" })
//     .then((response) => {
//         if (response.ok) {
//             eventDiv.remove();
//         } else {
//             console.error("Erreur lors de la suppression de l'événement");
//         }
//     })
//     .catch((error) => {
//         console.error("Erreur lors de la suppression de l'événement :", error);
//     });
// }

// /* Appels de fonctions */
// fetchData();


/* Evenements */


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
function displayEvents(data) {
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

        const buttonDiv = document.createElement("div");
        event.dates.forEach((date) => {
            const yesButton = document.createElement("button");
            yesButton.textContent = "V";
            yesButton.addEventListener("click", (e) => {
                e.preventDefault();
                const participantName = nameInput.value;
                updateParticipantAvailability(event.id, event.name, participantName, date.date, true);
            });
            buttonDiv.appendChild(yesButton);

            const noButton = document.createElement("button");
            noButton.textContent = "X";
            noButton.addEventListener("click", (e) => {
                e.preventDefault();
                const participantName = nameInput.value;
                updateParticipantAvailability(event.id, event.name, participantName, date.date, false);
            });
            buttonDiv.appendChild(noButton);
        });

        form.appendChild(buttonDiv);
        eventDiv.appendChild(form);
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

// Mise à jour de la disponibilité du participant
function updateParticipantAvailability(eventId, eventName, participantName, upDate, availability) {
    fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
        json.forEach(obj => {
            if(obj.id === eventId){
                obj.dates.forEach(apiDate => {
                    apiDate.attendees.forEach(attend => {
                        if(attend.name === participantName){
                            console.log(eventId, eventName, participantName, upDate, availability);
                            fetch(`http://localhost:3000/api/events/${eventId}`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    name: eventName, 
                                    // attendees: [ dates: [ { date: upDate, available: availability } ] ]
                                    dates: [ { date: upDate, available: availability } ]
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
    });
}

/* Appels de fonctions */
fetchData();
