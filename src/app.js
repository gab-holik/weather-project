function searchDefaultCity(city) {
  let apiKey = "0a06cf698c423c76ccf45f471534e072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCity);
  document.querySelector("#city").innerHTML = `${city}`;
}
function showTimeDefault(city) {
  let apiKey = "b8a48b17b8144181bca6c7e9eb92b0f9";
  let apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${city}`;
  axios.get(apiUrl).then(changeDefaultTime);
}
function changeDefaultTime(response) {
  document.querySelector("h6").innerHTML = response.data.date_time;
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
form.addEventListener("submit", updateCityTime);

function updateCityTime(event) {
  event.preventDefault();
  let city = document.querySelector("#citysearch");
  let apiKey = "b8a48b17b8144181bca6c7e9eb92b0f9";
  let apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${city.value}`;
  axios.get(apiUrl).then(changeCityTime);
}
function changeCityTime(response) {
  document.querySelector("h6").innerHTML = response.data.date_time;
}

function showWeatherCity(response) {
  celsiusT = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusT);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let main = response.data.weather[0].main;
  if (main === "Rain" || main === "Drizzle") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/rain.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document.querySelector("#mainicon").setAttribute("src", "images/rainy.png");
  } else if (main === "Clear") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/sunny.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document.querySelector("#mainicon").setAttribute("src", "images/sun.png");
  } else if (main === "Thunderstorm") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/storm.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/thunderstorm.png");
  } else if (main === "Snow") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/snow.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#000000");
    document.querySelector("#celsius").setAttribute("style", "color:#000000");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#000000");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/snowing.png");
  } else if (main === "Clouds") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/clouds.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/cloudy.png");
  } else if (
    main === "Mist" ||
    main === "Haze" ||
    main === "Fog" ||
    main === "Dust" ||
    main === "Sand" ||
    main === "Ash" ||
    main === "Squall"
  ) {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('../images/fog.jpg')");
    document.querySelector("#mainicon").setAttribute("src", "images/haze.png");
  }
}

function showLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
  navigator.geolocation.getCurrentPosition(showLocalTime);
}
function showLocalTime(position) {
  let apiKey = "b8a48b17b8144181bca6c7e9eb92b0f9";
  let apiUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${position.coords.latitude}8&long=${position.coords.longitude}`;
  axios.get(apiUrl).then(changeLocalTime);
}
function changeLocalTime(response) {
  document.querySelector("h6").innerHTML = response.data.date_time;
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

  celsiusT = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusT);

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );

  let main = response.data.weather[0].main;
  if (main === "Rain" || main === "Drizzle") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/rain.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document.querySelector("#mainicon").setAttribute("src", "images/rainy.png");
  } else if (main === "Clear") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/sunny.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document.querySelector("#mainicon").setAttribute("src", "images/sun.png");
  } else if (main === "Thunderstorm") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/storm.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/thunderstorm.png");
  } else if (main === "Snow") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/snow.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#000000");
    document.querySelector("#celsius").setAttribute("style", "color:#000000");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#000000");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/snowing.png");
  } else if (main === "Clouds") {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('images/clouds.jpg')");
    document.querySelector("#location").setAttribute("style", "color:#ffffff");
    document.querySelector("#celsius").setAttribute("style", "color:#ffffff");
    document
      .querySelector("#fahrenheit")
      .setAttribute("style", "color:#ffffff");
    document
      .querySelector("#mainicon")
      .setAttribute("src", "images/cloudy.png");
  } else if (
    main === "Mist" ||
    main === "Haze" ||
    main === "Fog" ||
    main === "Dust" ||
    main === "Sand" ||
    main === "Ash" ||
    main === "Squall"
  ) {
    document
      .querySelector("#container")
      .setAttribute("style", "background-image:url('../images/fog.jpg')");
    document.querySelector("#mainicon").setAttribute("src", "images/haze.png");
  }
}
let currentButton = document.querySelector("#current-city");
currentButton.addEventListener("click", showLocal);

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
let celsiusT = null;
let fahrenheitL = document.querySelector("#fahrenheit");
fahrenheitL.addEventListener("click", updateFTemp);

let celsiustL = document.querySelector("#celsius");
celsiustL.addEventListener("click", updateCTemp);

searchDefaultCity("San Diego");
showTimeDefault("San Diego");
