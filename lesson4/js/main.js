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

// Pressing the menu button switches the style to display
// list items or hide them in the nav
const navbutton = document.querySelector('.menubutton');
const navigation = document.querySelector('.navigation');
navbutton.addEventListener('click', ()=>{
    navigation.classList.toggle("responsive")}, false);