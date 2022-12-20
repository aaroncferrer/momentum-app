const temp = document.querySelector('.temperature');
const loc = document.querySelector('.location');

// API key from openweathermap.org
const API_KEY = 'c2c8657492de745c522681b52c9eb1a2';

function onGeoOk(position) {
  // navigator.geolocation object to get the device's current latitude and longitude.
  // Latitude and longitude to get current location
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      temp.innerText = `${Math.round((data.main.temp -32) * (5/9) )}°C`
      loc.innerText = data.name
    });
}

function onGeoError() {
  alert("Location cannot be found. Cannot display weather.");
}

// --> getCurrentPosition() method is used to get the current position of the device.
// 1st parameter is successful callback, 2nd is error.
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
