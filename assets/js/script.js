const container = document.getElementById("events");
let events = [];
let tableHeaders = [];

fetch('http://localhost:3000/api/events/')
    .then((response) => response.json())
    .then((json) =>{
        console.log(json);
        createObject(json);
    });

function createObject(eventsRaw){
    // console.log(eventsRaw[0].dates[0].attendees[0].name);
    // console.log(eventsRaw[0].dates[0].date);
    events = eventsRaw.map((event)=>{
        return {
            'title':event.name,
            'description':event.description,
            'dates':[...event.dates],
        }
    })
    console.log(events);
    displayEvents(events);
}

function displayEvents(events) {
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.innerHTML = `
            <h2 class="events__title">${event.title}</h2>
            <p class="events__description">${event.description}</p>
            <table class="events__attendees">
                <thead class="events__attendees__header">
                    <tr>
                        <th>Attendees</th>
                        ${event.dates.map(eventDate => `<th>${eventDate.date}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${event.dates.map(eventDate => eventDate.attendees.map(attend => `
                    <tr>
                        <td>${attend.name}</td>
                        <td>${attend.available}</td>
                    </tr>
                    `).join('')).join('')}
                </tbody>
            </table>`;

        container.appendChild(eventDiv);
    });
}

// function displayEvents(events) {
//     events.forEach(event => {
//         const eventDiv = document.createElement("div");
//         eventDiv.innerHTML = `
//             <h2 class="events__title">${event.title}</h2>
//             <p class="events__description">${event.description}</p>
//             <table class="events__attendees">
//                 <thead class="events__attendees__header">
//                     <tr>
//                         <th>Attendees</th>
//                         ${event.dates.map(eventDate => `<th>${eventDate.date}</th>`).join('')}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${event.dates.map(eventDate => eventDate.attendees.map(attend => `
//                     <tr>
//                         <td>${attend.name}</td>
//                         <td>${attend.available}</td>
//                     </tr>
//                     `).join('')).join('')}
//                 </tbody>
//             </table>`;

//         container.appendChild(eventDiv);
//     });
// }
