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
        deleteDate();
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
        let form = document.querySelector("form");
        form.appendChild(span);
    });
}
function deleteDate() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("timeChoice")) {
            console.log("okok");
            console.log(e.target);
            e.target.remove();
        }
    });
}
// function lenghtOfInputs(input) {
//     const inputs= document.querySelectorAll("input") ;
//     inputs.forEach((input)=>{
//         // let maxCharacters=
//         if (in==true){
//             return true
//         } else return false, console.log(" There are more than 256 characters !");
//     })
// }
/* <dialog><form></form></dialog> */
