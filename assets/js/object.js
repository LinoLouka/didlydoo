export function createEvent() {
    const btn = document.querySelector(".header__btn");
    // header.innerHTML += `<dialog id="dialog"><form><label>Event's author</label><input></input><label>Event's title</label><input></input><label>Event's description</label><textarea name="label_input" id="label_input" cols="30" rows="10" class="task_input_description"></textarea><input type="date" name="" id="date_input"></form></dialog>`;

    function createEventButton() {
        console.log(btn);
        // let dialog = document.getElementById("dialog");
        // dialog.showModal();
        // dialog.showModal();
        const header = document.querySelector("header");
        header.innerHTML += `<section id="dialog"><form><label>Event's author</label><input></input><label>Event's title</label><input></input><label>Event's description</label><textarea name="label_input" id="label_input" cols="30" rows="10" class="task_input_description"></textarea><input type="date" name="" id="date_input"></form></section>`;
        const myDate = document.getElementById("date_input");
        initiateCurrentDate(myDate);
        displayDate(myDate);
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
    document.addEventListener("change", (e) => {
        console.log(inputDate.value);
        let form = document.querySelector("form");
        form.innerHTML += `<span>${inputDate.value}</span>`;
    });
}
// function displayDate(inputDate) {
//     // console.log(inputDate.value);
//     inputDate.addEventListener("change", (e) => {
//         let form = document.querySelector("form");
//         console.log(inputDate.value);
//         form.innerHTML += `<span>${inputDate.value}</span>`;
//     });
// }
{
    /* <dialog><form></form></dialog> */
}
