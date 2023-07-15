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
// let temp = document.querySelector('#temp').innerHTML;
// let speed = document.querySelector('#windSpeed').innerHTML;
// console.log(temp, speed);
// buildWC(speed, temp);

// Calculate the Windchill
function buildWC(speed, temp) {
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    console.log("wc: " + wc);
    // Return the windchill
    return wc;
}

// Change the Storm Severity range output
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}


// Get Preston API Data
let prestonId = 5604473; // ID for preston Idaho

let apikey = "4b1d9107c71af119ac62f7121db1433f";

let prestonCurrentPath = `https://api.openweathermap.org/data/2.5/weather?id=${prestonId}&units=imperial&appid=${apikey}`;

// Get Current data
fetch(prestonCurrentPath)
    .then(function (response) {
        if(response.ok) {
        return response.json();
     }
    throw new ERROR('Network response was not ok');
    })
    .then(function (jsonObject) {
        console.log(jsonObject);
        let description = jsonObject.weather[0].description;
        let temp = Math.round((jsonObject.main.temp)); // Convert from k to f
        let humidity = jsonObject.main.humidity;
        let windspeed = Math.round(jsonObject.wind.speed);
        // console.log("description: " + description);
        // console.log("temp: " + temp);
        // console.log("humidity: " + humidity);
        // console.log("windspeed: " + windspeed);

        // Change the text content
        document.getElementById('condition-small').textContent = description;
        document.getElementById('temp-small').textContent = temp;
        document.getElementById('humidity-small').textContent = humidity;
        document.getElementById('windSpeed-small').textContent = windspeed;

        document.getElementById('condition-large').textContent = description;
        document.getElementById('temp-large').textContent = temp;
        document.getElementById('humidity-large').textContent = humidity;
        document.getElementById('windSpeed-large').textContent = windspeed;

        let wc = buildWC(windspeed, temp); // Calculate and set wind chill
        console.log("windchill " + wc);
        document.getElementById('windChill-small').textContent = wc;
        document.getElementById('windChill-large').textContent = wc;
        
    })
.catch(function(error){
    console.log('Fetch error: ', error.message);
})


let dayNum = 1;
let currentweekday = new Date().getDay();

// Get Forcast Data
const prestonForecastPath = `https://api.openweathermap.org/data/2.5/forecast?id=${prestonId}&units=imperial&appid=${apikey}`;
fetch(prestonForecastPath)
.then(function (response) {
if(response.ok) {
return response.json();
}
throw new ERROR('Network response was not ok');
})
.then(function (jsonObject) {
console.log(jsonObject);  // temporary checking for valid response and data parsing

// Set up dates to make sure we aren't getting the different times from the same dates
let olddate = "nothing";

for (let i = 0; i < 40; i++) {
    //console.log(jsonObject.list[i].main.feels_like);
    let time = jsonObject.list[i].dt_txt.substring(11, 19);
    
    // Set up dates to make sure we aren't getting the different times from the same dates
    let newdate = jsonObject.list[i].dt_txt.substring(0, 10);
    
    // Check if right time of day and the date is different
    if (time == '18:00:00' && (olddate != newdate)) {
        console.log("Current date of entry: " + olddate);
        console.log("time: " + time);

        let temp = Math.round(jsonObject.list[i].main.feels_like); // Get the temp for that day
        let icon = 'https://openweathermap.org/img/w/' + jsonObject.list[i].weather[0].icon + '.png'; // Get the correct icon for that day
        let description = jsonObject.list[i].weather[0].description; // Get description of weather icon for alt text
        
        let tempid = 'day' + dayNum + "-temp"; // Get the temp id from html file
        let iconid = 'day' + dayNum + "-icon"; // Get the icon id from html file
        let weekdayid = 'day' + dayNum + "-weekday"; // Get the weekday id from html file
        console.log("temperature: " + temp);
        console.log("Current day: " + weekday[currentweekday]);
        document.getElementById(tempid).textContent = temp + "°F"; // Add temp
        document.getElementById(iconid).src = icon; // Add icon
        document.getElementById(iconid).alt = description; // Add alt text
        document.getElementById(weekdayid).textContent = weekday[currentweekday]; // Add weekday based on weekday array made above
        dayNum++; // Iterate through html elements
        currentweekday++; // Iterate weekday
        // Roll back the day counter if it goes over 6
        if (currentweekday > 6) {
            currentweekday = 0;
        }
        olddate = newdate; // Reset old date to this current date to make sure we don't get info from the same date again
    }

}

})
.catch(function(error){
console.log('Fetch error: ', error.message);
})