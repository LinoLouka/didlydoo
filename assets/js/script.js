fetch("http://localhost:3000/api/events/")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((event) => {
            console.log(data);
            const allEvents = document.getElementById("events");
            allEvents.innerHTML += `<div class="title">${
                event.name
            } </div><div class="author">${
                event.author
            }</div><table><thead><tr><th>Date</th>${event.dates[0].attendees
                .map((attendee) => `<th>${attendee.name}</th>`)
                .join("")}</tr></thead><tbody></tbody></table>`;
            event.dates.forEach((date) => {
                const table = document.querySelector(
                    "table:last-of-type tbody"
                );
                const row = document.createElement("tr");
                const dateCell = document.createElement("td");
                dateCell.textContent = date.date;
                row.appendChild(dateCell);
                date.attendees.forEach((attendee) => {
                    const availabilityCell = document.createElement("td");
                    availabilityCell.textContent = attendee.available;
                    row.appendChild(availabilityCell);
                });
                table.appendChild(row);
            });
        });
    });
