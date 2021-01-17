// Day and time
function formatDate(timestamp) {
  let date = new Date(timestamp);

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
  return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
  return `${hours}:${minutes}`;
}

// Show city, current weather and forecast
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
  document.querySelector("#condition-icon").setAttribute("src", `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`);

  // Show weather quote
  let weatherQuotes = [
    "What is interesting about lightning storms? They can be quite striking.",
    "Complaining about the weather is a full-time job.",
    "It is best to read the weather forecast before praying for the rain.",
    "Hello, ice to meet you.",
    "The message from the sun was enlightening.",
    "Weather forecast for tonight: Dark with a chance for tomorrow in the morning.",
    "It is a great day for naps. Followed by naps.",
    "Coming up with weather puns is a breeze."
];

  let weatherQuote = document.querySelector("#weather-quote");
  let iconCode = response.data.weather[0].icon;

  if (iconCode === "11d") {
    weatherQuote.innerText = weatherQuotes[0];
  }
  else if (iconCode === "09d") {
    weatherQuote.innerText = weatherQuotes[1];
  }
  else if (iconCode === "10d") {
    weatherQuote.innerText = weatherQuotes[2];
  }
  else if (iconCode === "13d") {
    weatherQuote.innerText = weatherQuotes[3];
  }
  else if (iconCode === "01d") {
    weatherQuote.innerText = weatherQuotes[4];
  }
  else if (iconCode === "01n" || "02n" || "03n" || "04n") {
    weatherQuote.innerText = weatherQuotes[5];
  }
  else if (iconCode === "02d" || "03d" || "04d") {
    weatherQuote.innerText = weatherQuotes[6];
  }
  else {
    weatherQuote.innerText = weatherQuotes[7];
  }
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
      <div class="hour">
      ${formatHours(forecast.dt * 1000)}
      </div>
      <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" class="forecast-icons" />
      <div class="forecast-temp">
      <strong>
      ${Math.round(forecast.main.temp)}
      </strong> 
      </div>
    </div>
  `;
  }
}

function searchCity(cityInput) {
  let apiKey = "ba32fdef5d635b26f61cd641f6ab56c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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