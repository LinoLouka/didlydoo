const submitBtn = document.getElementById("submit");
export function createEvent() {
    // const btn = document.querySelector(".header__btn");
    // header.innerHTML += `<dialog id="dialog"><form><label>Event's author</label><input></input><label>Event's title</label><input></input><label>Event's description</label><textarea name="label_input" id="label_input" cols="30" rows="10" class="task_input_description"></textarea><input type="date" name="" id="date_input"></form></dialog>`;
    // console.log(btn);
    // let dialog = document.getElementById("dialog");
    // dialog.showModal();
    // dialog.showModal();
    const header = document.querySelector("header");
    header.innerHTML += `<section id="dialog"><form><label for="name">Event's author<span id="error_author"></span></label><input type="text" name="author" class="text_input"></input><label for="name">Event's name<span id="error_name"></span></label><input type="text" name="name" class="text_input"></input><label for ="description">Event's description<span id="error_description"></span></label><textarea name="description" class="text_input" id="description_input" cols="30" rows="10"  class="text_input"></textarea><input type="date" name="date"class="text_input"  id="date_input"><div id="date_output"></div><span id="error_date"></span><button type="submit" id="submit">Create event</button></form></section>`;
    const myDate = document.getElementById("date_input");
    initiateCurrentDate(myDate);
    displayDate(myDate);
    deleteDate();
    submit.addEventListener("click", getInput);
}
function currentDate() {
    const today = new Date();
    return today.toISOString().slice(0, 10); // Convert in string & Remove the useless part after 10 letters : hours, minutes, seconds
}
function initiateCurrentDate(inputDate) {
    /* Display the min date in the calendar */
    const date = currentDate();
    inputDate.defaultValue = date;

    /* Block the dates before the min date in the calendar */
    inputDate.min = date;
}
/* Display the dates under the calendar */
function displayDate(inputDate) {
    inputDate.addEventListener("change", (e) => {
        let span = document.createElement("span");
        span.setAttribute("class", "timeChoice");
        span.textContent = inputDate.value;
        let dateOutput = document.querySelector("#date_output");
        dateOutput.appendChild(span);
    });
}

/* Delete the dates under the calendar by click*/
function deleteDate() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("timeChoice")) {
            e.target.remove();
        }
    });
}

/* Get all the inputs from the form */
function getInput(event) {
    const textInputs = document.querySelectorAll(".text_input");
    const dateOutputContainer = document.querySelector("date_output");
    const dateOutput = document.querySelectorAll(".timeChoice");
    event.preventDefault();
    if (verifyInputs(textInputs, dateOutput)) {
        let objectEvent = createObjectEvent();
        insertElementObject(
            objectEvent,
            textInputs,
            dateOutput,
            dateOutputContainer
        );
        console.log(objectEvent);
        // console.log(date_outputs.value);

        fetchDataPost(
            textInputs[1].value,
            textInputs[0].value,
            textInputs[2].value,
            objectEvent.dates
        );
    }
    // else {
    //     console.log("heuu");
    // }
}

/* Check if the inputs are filled and have less than 256 characters */
function verifyInputs(text_inputs, date_outputs, dateOutputContainer) {
    let isValid = true;
    text_inputs.forEach((text_input) => {
        const span = document.querySelector(`#error_${text_input.name}`);
        if (text_input.name !== "date") {
            if (text_input.value.trim() !== "") {
                if (text_input.value.length <= 256) {
                    span.innerHTML = "";
                } else {
                    span.innerHTML = "There are more than 256 characters";
                    span.style.color = "red";
                    isValid = false;
                }
            } else {
                span.innerHTML = "It's empty !";
                span.style.color = "red";
                isValid = false;
            }
        } else {
            if (date_outputs.length !== 0) {
                span.innerHTML = "";
            } else {
                span.innerHTML = "ther is no date !";
                span.style.color = "red";
                isValid = false;
            }
        }
    });
    return isValid;
}

/* Create the default object that will includes all the inputs value*/
function createObjectEvent() {
    let objectEvent = new Object();
    objectEvent = {
        id: "",
        name: "",
        description: "",
        author: "",
        dates: [],
        attendees: "",
        created_at: "",
        num_modification: "",
        last_modification: "",
    };
    // objectEvent.id = "premierId01";
    // objectEvent.attendees = ["name", "dates"]; //pour visualiser, A supprimer
    return objectEvent;
}

/* Put the inputs value in the object */
function insertElementObject(defaultObject, text_inputs, dateInputs) {
    text_inputs.forEach((text_input) => {
        //insert inputs' value (author, event, description)
        if (text_input.name !== "date") {
            defaultObject[text_input.name] = text_input.value;
        }
    });
    dateInputs.forEach((dateInput) => {
        defaultObject.dates.push(dateInput.textContent);
    });
    const todayDate = currentDate();
    defaultObject.created_at = todayDate;
    const newid = createId();
    defaultObject.id = newid;
}

/* Create n id per event */
function createId() {
    const id = "38b643aeb883";
    const lastThree = id.substr(-3); // extract last three characters
    let num = parseInt(lastThree) + 1; // increment by 1
    let newLastThree = num.toString().padStart(3, "0"); // convert back to string and pad with leading zeros
    let newId = id.slice(0, -3) + newLastThree; // concatenate back to original string
    return newId;
}
/* <dialog><form></form></dialog> */

function fetchDataPost(name, author, description, dates) {
    fetch("http://localhost:3000/api/events/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            author: author,
            description: description,
            dates: dates,
        }),
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            // createEvent(json);
        });
}
