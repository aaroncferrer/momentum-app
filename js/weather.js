// require('dotenv').config()
// --> require() will not work since it's a built in node function and not available in the browser.
// --> JavaScript will throw an error saying that require is not defined
// --> This error happens because require is not in the node_module or list of packages that'd make the dotenv package function.
// --> You would need to use a bundler like Web pack or Vite to build your application so it's useable on the frontend / client-side.

const temp = document.querySelector('.temperature');
const loc = document.querySelector('.location');

// API key from openweathermap.org
const API_KEY = config.MOMENTUM_OPEN_WEATHER_API_KEY;

function onGeoOk(position) {
  // Latitude and longitude to get current location
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {

      // console.log(data)
      // console.log(data.main.temp)
      // console.log(data.name)

      temp.innerText = `${Math.round((data.main.temp -32) * (5/9) )}°C`
      loc.innerText = data.name
    });
}

function onGeoError() {
  alert("Location cannot be found. Cannot display weather.");
}

// --> The navigator.geolocation read-only property returns a Geolocation object that gives Web content access to the location of the device. This allows a Web site or app to offer customized results based on the user's location.
// --> getCurrentPosition() method is used to get the current position of the device.
// 1st parameter is successful callback, 2nd is error.
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
