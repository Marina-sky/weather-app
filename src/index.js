// Day and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

// Show city and current weather
function showCurrentWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-day-time").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#condition-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(cityInput) {
  let apiKey = "ba32fdef5d635b26f61cd641f6ab56c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

// Weather on current location
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ba32fdef5d635b26f61cd641f6ab56c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

// Unit conversion
function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Zagreb");