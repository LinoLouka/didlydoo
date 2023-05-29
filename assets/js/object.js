export function createEvent() {
    const btn = document.querySelector(".header__btn");
    // header.innerHTML += `<dialog id="dialog"><form><label>Event's author</label><input></input><label>Event's title</label><input></input><label>Event's description</label><textarea name="label_input" id="label_input" cols="30" rows="10" class="task_input_description"></textarea><input type="date" name="" id="date_input"></form></dialog>`;

    function createEventButton() {
        console.log(btn);
        // let dialog = document.getElementById("dialog");
        // dialog.showModal();
        // dialog.showModal();
        const header = document.querySelector("header");
        header.innerHTML += `<section id="dialog"><form><label for="name">Event's author<span id="error_author"></span></label><input type="text" name="author" class="text_input"></input><label for="title">Event's title<span id="error_title"></span></label><input type="text" name="title" class="text_input"></input><label for ="description">Event's description<span id="error_description"></span></label><textarea name="description" id="description_input" cols="30" rows="10" class="text_input"></textarea><input type="date" name="date" id="date_input"><div id="date_output"></div><button type="submit" id="submit">Create event</button></form></section>`;
        const myDate = document.getElementById("date_input");
        initiateCurrentDate(myDate);
        displayDate(myDate);
        deleteDate();
        submit.addEventListener("click", lenghtOfInputs);
    }
    btn.addEventListener("click", createEventButton);
}
function initiateCurrentDate(inputDate) {
    /* Display the min date in the calendar */
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10); // Convert in string & Remove the useless part after 10 letters : hours, minutes, seconds
    inputDate.defaultValue = formattedDate;

    /* Block the dates before the min date in the calendar */
    inputDate.min = formattedDate;
}
function displayDate(inputDate) {
    inputDate.addEventListener("change", (e) => {
        let span = document.createElement("span");
        span.setAttribute("class", "timeChoice");
        span.textContent = inputDate.value;
        let dateOutput = document.querySelector("#date_output");
        dateOutput.appendChild(span);
    });
}
function deleteDate() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("timeChoice")) {
            e.target.remove();
        }
    });
}

function lenghtOfInputs(event) {
    event.preventDefault();
    const textInputs = document.querySelectorAll(".text_input");
    textInputs.forEach((input) => {
        const span = document.querySelector(`#error_${input.name}`);
        if (input.value.trim() !== "") {
            if (input.value.length <= 256) {
                span.innerHTML = "";
            } else {
                span.innerHTML = "There are more than 256 characters";
                span.style.color = "red";
            }
        } else {
            span.innerHTML = "It's empty !";
            span.style.color = "red";
        }
    });
}

/* <dialog><form></form></dialog> */
