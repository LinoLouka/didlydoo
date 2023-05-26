// fetch("http://localhost:3000/api/events/")
//     .then((res) => res.json())
//     .then((data) => {
//         data.forEach((event) => {
//             console.log(data);
//             const allEvents = document.getElementById("events");
//             allEvents.innerHTML += `<div class="title">${
//                 event.name
//             } </div><div class="author">${
//                 event.author
//             }</div><table><thead><tr><th>Date</th>${event.dates[0].attendees
//                 .map((attendee) => `<th>${attendee.name}</th>`)
//                 .join("")}</tr></thead><tbody></tbody></table>`;
//             event.dates.forEach((date) => {
//                 const table = document.querySelector(
//                     "table:last-of-type tbody"
//                 );
//                 const row = document.createElement("tr");
//                 const dateCell = document.createElement("td");
//                 dateCell.textContent = date.date;
//                 row.appendChild(dateCell);
//                 date.attendees.forEach((attendee) => {
//                     const availabilityCell = document.createElement("td");
//                     availabilityCell.textContent = attendee.available;
//                     row.appendChild(availabilityCell);
//                 });
//                 table.appendChild(row);
//             });
//         });
//     });

fetch("http://localhost:3000/api/events/")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((event) => {
            console.log(data);
            const allEvents = document.getElementById("events");
            allEvents.innerHTML += `<div class="title">${event.name} </div><div class="author">${event.author}</div>`;
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = "Date";
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
    });
