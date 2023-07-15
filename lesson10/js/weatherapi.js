// Week 10
let cityId = 5604473; // ID for preston Idaho

let apikey = "4b1d9107c71af119ac62f7121db1433f";

//let prestonPath = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apikey}`;

// Lat and long for fish haven
const prestonPath = 'https://api.openweathermap.org/data/2.5/weather?lat=42.2138&lon=111.23456&units=imperial&appid=4b1d9107c71af119ac62f7121db1433f';


fetch(prestonPath)
    .then(function (response) {
        if(response.ok) {
        return response.json();
     }
    throw new ERROR('Network response was not ok');
    })
    .then(function (jsonObject) {
        console.log(jsonObject);
        let tempId = document.getElementById('current-temp');
        tempId.textContent = jsonObject.main.temp;
        
        const imagesrc = 'https://openweathermap.org/img/w/' + jsonObject.weather[0].icon + '.png';  // note the concatenation
        const desc = jsonObject.weather[0].description;  // note how we reference the weather array
        document.getElementById('imagesrc').textContent = imagesrc;  // informational specification only
        document.getElementById('icon').setAttribute('src', imagesrc);  // focus on the setAttribute() method
        document.querySelector('#icon').setAttribute('alt', desc);
    })
.catch(function(error){
    console.log('Fetch error: ', error.message);
})