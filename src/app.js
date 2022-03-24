let today = new Date();
let h6 = document.querySelector("h6");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hours = today.getUTCHours();
let minutes = today.getUTCMinutes();

h6.innerHTML = `${day} ${hours}:${minutes}`;

function searchDefaultCity(city) {
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCity);
  document.querySelector("#city").innerHTML = `${city}`;
}
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citysearch");
  document.querySelector("#city").innerHTML = `${city.value}`;
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", updateCity);

function showWeatherCity(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}
function showLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocalWeather);
}

function showLocalWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
}
let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", showLocal);
searchDefaultCity("San Diego");
