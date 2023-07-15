// Get all of the inputs and buttons
const input = document.getElementById("favchap");
const submitButton = document.getElementById("submitButton");
const list = document.getElementById("list");

submitButton.addEventListener('click', function() {
    // First function adds an entry if something is
    // in the input
    if (input.value === ""){
        console.log("Nothing in Input");
    }
    else {
        // Create the list item to add
        var listItem = document.createElement('LI');
        var listNode = document.createTextNode(input.value);
        listItem.appendChild(listNode);
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        // Add delete button to the li
        listItem.appendChild(deleteButton);
        // Add the li to the ul
        list.appendChild(listItem);
        // Clear input and focus on it
        input.value = "";
        input.focus();
        deleteButton.addEventListener('click', function() {
            // Removes an li
            list.removeChild(listItem);
            input.focus();
            input.value = "";
        })
    }
});

// Last updated
const year = new Date().getFullYear();
const lastModified = new Date(document.lastModified);

// Get the full name of day and month
var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
"Thursday", "Friday", "Saturday");
var months = new Array("January", "February", "March",
"April", "May", "June", "July", "August", "September",
 "October", "November", "December");
var day = lastModified.getDay();
var day = weekday[day];
var month = lastModified.getMonth();
var month = months[month];

// Format for last modified in the footer
var lastUpdated = day + ', ' + lastModified.getDate() + ' ' + month + " " + lastModified.getFullYear();

document.getElementById("currentyear").textContent = year;
document.getElementById("lastModified").textContent = lastUpdated;
