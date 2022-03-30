function searchCity(city) {
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCity);
  let apiTimeKey = "b8a48b17b8144181bca6c7e9eb92b0f9";
  let apiTimeUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiTimeKey}&location=${city}`;
  axios.get(apiTimeUrl).then(changeCityTime);
  document.querySelector("#city").innerHTML = `${city}`;
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citysearch").value;
  searchCity(city);
}

function changeCityTime(response) {
  document.querySelector("h6").innerHTML = response.data.date_time;
}

function showWeatherCity(response) {
  updateForecast(response.data.coord);
  celsiusT = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusT);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#container")
    .setAttribute(
      "style",
      `background-image:url('images/background/${response.data.weather[0].main}.jpg')`
    );
  document
    .querySelector("#mainicon")
    .setAttribute(
      "src",
      `images/main-icon/${response.data.weather[0].icon}.png`
    );
}
searchCity("San Diego");

function updateForecast(coordinates) {
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={current,minutely,hourly}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", updateCity);

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastday, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col">
  <div class="forecast-day">${formatDate(forecastday.dt)}</div>
  <img src="images/${forecastday.weather[0].icon}.png"/>
  <div class="forecast-temp">${Math.round(forecastday.temp.day)}°</div>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", showLocal);

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
  let apiTimeKey = "b8a48b17b8144181bca6c7e9eb92b0f9";
  let apiTimeUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiTimeKey}&lat=${lat}8&long=${long}`;
  axios.get(apiTimeUrl).then(changeLocalTime);
}
function changeLocalTime(response) {
  document.querySelector("h6").innerHTML = response.data.date_time;
}
function showLocalWeather(response) {
  updateForecast(response.data.coord);
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusT = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusT);

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#container")
    .setAttribute(
      "style",
      `background-image:url('images/background/${response.data.weather[0].main}.jpg')`
    );
  document
    .querySelector("#mainicon")
    .setAttribute(
      "src",
      `images/main-icon/${response.data.weather[0].icon}.png`
    );
}
let celsiusT = null;
let fahrenheitL = document.querySelector("#fahrenheit");
fahrenheitL.addEventListener("click", updateFTemp);

let celsiustL = document.querySelector("#celsius");
celsiustL.addEventListener("click", updateCTemp);

function updateFTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = celsiusT * 1.8 + 32;
  document.querySelector("#temp").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#fahrenheit").setAttribute("style", "color:#FF7F50");
  document.querySelector("#celsius").setAttribute("style", "color:#FFFFFF");
}

function updateCTemp(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(celsiusT);
  document.querySelector("#celsius").setAttribute("style", "color:#FF7F50");
  document.querySelector("#fahrenheit").setAttribute("style", "color:#FFFFFF");
}
