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


// Get Dayton API Data
let daytonId = 4509884; // ID for dayton ohio

let apikey = "4b1d9107c71af119ac62f7121db1433f";

let daytonCurrentPath = `https://api.openweathermap.org/data/2.5/onecall?lat=39.7589&lon=-84.1916&units=imperial&appid=${apikey}`;

// Get Current data
fetch(daytonCurrentPath)
    .then(function (response) {
        if(response.ok) {
        return response.json();
     }
    throw new ERROR('Network response was not ok');
    })
    .then(function (jsonObject) {
        console.log(jsonObject);
        let description = jsonObject.current.weather[0].description;
        console.log(description);
        let temp = Math.round((jsonObject.current.temp));
        let humidity = jsonObject.current.humidity;
        
        // Change the text content
        document.getElementById('condition-large').textContent = description;
        document.getElementById('temp-large').textContent = temp;
        document.getElementById('humidity-large').textContent = humidity;
        
    })
.catch(function(error){
    console.log('Fetch error: ', error.message);
})


let dayNum = 1;
let currentweekday = new Date().getDay();

// Get Forecast Data
const daytonForecastPath = `https://api.openweathermap.org/data/2.5/forecast?id=${daytonId}&units=imperial&appid=${apikey}`;
fetch(daytonCurrentPath)
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

for (let i = 0; i < 3; i++) {
    let currentDay = jsonObject.daily[i];

    let temp = Math.round(currentDay.temp.day);
    console.log(currentDay.weather[0].icon);
    let icon = 'https://openweathermap.org/img/w/' + currentDay.weather[0].icon + '.png';
    let alt = currentDay.weather[0].description;

    let tempid = 'day' + i + "-temp";
    let iconid = 'day' + i + "-icon";
    let weekdayid = "day" + i + "-weekday";

    document.getElementById(weekdayid).textContent = weekday[currentweekday];
    document.getElementById(tempid).textContent = temp;
    document.getElementById(iconid).src = icon;
    document.getElementById(iconid).alt = alt;

    currentweekday++;

    // //console.log(jsonObject.list[i].main.feels_like);
    // let time = jsonObject.list[i].dt_txt.substring(11, 19);
    
    // // Set up dates to make sure we aren't getting the different times from the same dates
    // let newdate = jsonObject.list[i].dt_txt.substring(0, 10);
    
    // // Check if right time of day and the date is different
    // if (time == '18:00:00' && (olddate != newdate)) {
    //     console.log("Current date of entry: " + olddate);
    //     console.log("time: " + time);

    //     let temp = Math.round(jsonObject.list[i].main.feels_like); // Get the temp for that day
    //     let icon = 'https://openweathermap.org/img/w/' + jsonObject.list[i].weather[0].icon + '.png'; // Get the correct icon for that day
    //     let description = jsonObject.list[i].weather[0].description; // Get description of weather icon for alt text
        
    //     let tempid = 'day' + dayNum + "-temp"; // Get the temp id from html file
    //     let iconid = 'day' + dayNum + "-icon"; // Get the icon id from html file
    //     let weekdayid = 'day' + dayNum + "-weekday"; // Get the weekday id from html file
    //     console.log("temperature: " + temp);
    //     console.log("Current day: " + weekday[currentweekday]);
    //     document.getElementById(tempid).textContent = temp + "°F"; // Add temp
    //     document.getElementById(iconid).src = icon; // Add icon
    //     document.getElementById(iconid).alt = description; // Add alt text
    //     document.getElementById(weekdayid).textContent = weekday[currentweekday]; // Add weekday based on weekday array made above
    //     dayNum++; // Iterate through html elements
    //     currentweekday++; // Iterate weekday
    //     // Roll back the day counter if it goes over 6
    //     if (currentweekday > 6) {
    //         currentweekday = 0;
    //     }
    //     olddate = newdate; // Reset old date to this current date to make sure we don't get info from the same date again
    // }

}

})
.catch(function(error){
console.log('Fetch error: ', error.message);
})
