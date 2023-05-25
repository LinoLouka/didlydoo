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

// function display(){
//     let newDiv = document.createElement("div");
//     newDiv.innerHTML = `<h2>Hello</h2>` + `<h3>Hello2</h3>`;
//     container.appendChild(newDiv);
// }
// display();

function displayEvents(events) {
    events.forEach(event => {
        // Create a new <div> element for each event
        eventDiv = document.createElement("div");
        
        eventDiv.innerHTML = `
            <h2 class="events__title">${event.title}</h2>
            <p class="events__description">${event.description}</p>
            <table class="events__attendees">
                <thead class="events__attendees__header">
                    <tr>`;

        event.dates.forEach(eventDate => {
            eventDiv.innerHTML += `
                        <th>${eventDate.date}</th>`;
        });
        eventDiv.innerHTML += `
                    </tr>
                </thead>
                <tbody>`;
        event.dates.forEach(eventDate => {
            eventDate.attendees.forEach(attend => {
                eventDiv.innerHTML += `
                    <tr>
                        <td>${attend.name}</td>
                        <td>${attend.available}</td>
                    </tr>`;
            });
        });
        eventDiv.innerHTML += `
                </tbody>
            </table>`;
        
        // Append the event <div> to a container element in the HTML document
        container.appendChild(eventDiv);
    });
}


function TESTdisplayEvents(api){
    api.forEach(event => {
        console.log(event.name);
        eventDiv = document.createElement("div");
        eventDiv.innerHTML = `
        <h2 class="events__title">${event.name}</h2>
        <p class="events__description">${event.description}</p>`;
        event.dates.forEach(date =>{
            event.innerHTML += `
                <table class="events__attendees">
                    <thead class="events__attendees__header">
                        <tr>
                            <th></th>
                            <th>${date.date}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The table body</td>
                            <td>with two columns</td>
                        </tr>
                    </tbody>
                </table>`;
        })
        container.appendChild(eventDiv);
    });
}