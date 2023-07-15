const year = new Date().getFullYear();
var currentDay = new Date().getDay();
const lastModified = new Date(document.lastModified);

// Get the full name of day and month
var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
"Thursday", "Friday", "Saturday");
var months = new Array("January", "February", "March",
"April", "May", "June", "July", "August", "September",
 "October", "November", "December");
var day = lastModified.getDay();
var day = weekday[day];
var currentDay = weekday[currentDay];
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


// Show Pancake banner only on Fridays
const pancakeBanner = document.querySelector('.pancakebanner');
if (currentDay == "Friday") {
    console.log(day);
    pancakeBanner.classList.toggle("showpancake");
}

// Testing the windchill function
let temp = document.querySelector('#temp').innerHTML;
let speed = document.querySelector('#windSpeed').innerHTML;
console.log(temp, speed);
buildWC(speed, temp);

// Calculate the Windchill
function buildWC(speed, temp) {
    let wcTemp = document.getElementById('windChill');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    // Round the answer down to integer
    wc = Math.floor(wc);
    console.log(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    // Display the windchill
    console.log(wc);
    wcTemp.innerHTML = wc;
}