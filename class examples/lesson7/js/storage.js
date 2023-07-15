// Handle DOM build completion
document.addEventListener("DOMContentLoaded", function () {
  lsSetValues();
  ssSetValues();
});

// Listen for Local storage clear
const clearLSButton = document.querySelector("#clearls");
clearLSButton.addEventListener('click', function (event) {
  window.localStorage.clear();
});

// Listen for session storage clear
const clearSSButton = document.querySelector("#clearss");
clearSSButton.addEventListener('click', function (event) {
  window.sessionStorage.clear();
});

// Listen for form submission
const formButton = document.querySelector("#submit");
formButton.addEventListener('click', function (event) {
  event.preventDefault();

  let city = document.getElementById('city').value;
  let state = document.getElementById('state').value;
  let temp = document.getElementById('temp').value;
  let wind = document.getElementById('wind').value;
  const ss = window.sessionStorage;
  const ls = window.localStorage;
  //  Store to Session Storage
  ss.setItem("city", city);
  ss.setItem("state", state);
  ss.setItem("temp", temp);
  ss.setItem("wind", wind);
  //  Store to Local Storage
  ls.setItem("city", city);
  ls.setItem("state", state);
  ls.setItem("temp", temp);
  ls.setItem("wind", wind);

  lsSetValues();
  ssSetValues();
});

function ssSetValues() {
  const ss = window.sessionStorage;
  if (ss.city == null) return;

  let location = document.getElementById('sslocationName');
  location.innerHTML = ss.getItem('city') + ', ' + ss.getItem('state');
  let curWind = document.getElementById('sscurWind');
  curWind.innerHTML = ss.getItem('wind') + 'mph';
  let curTemp = document.getElementById('sscurTemp');
  curTemp.innerHTML = ss.getItem('temp') + "&deg;F";
  let wc = buildWC(ss.getItem('wind'), ss.getItem('temp'));
  document.getElementById('sswindChill').innerHTML = wc;
}

function lsSetValues() {
  const ls = window.localStorage;
  if (ls.city == null) {
    return;
  }
  let location = document.getElementById('lslocationName');
  location.innerHTML = ls.getItem('city') + ', ' + ls.getItem('state');
  let curWind = document.getElementById('lscurWind');
  curWind.innerHTML = ls.getItem('wind') + 'mph';
  let curTemp = document.getElementById('lscurTemp');
  curTemp.innerHTML = ls.getItem('temp') + "&deg;F";;
  let wc = buildWC(ls.getItem('wind'), ls.getItem('temp'));
  document.getElementById('lswindChill').innerHTML = wc;
}


function buildWC(speed, temp) {
  let wcTemp = document.getElementById('windChill');

  // Compute the windchill
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
  console.log(wc);

  // Round the answer down to integer
  wc = Math.floor(wc);

  // If chill is greater than temp, return the temp
  wc = (wc > temp) ? temp : wc;

  // Display the windchill
  wc = wc + '°F';
  return wc;
}