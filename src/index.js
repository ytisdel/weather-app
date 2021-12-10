let now = new Date();

let h5 = document.querySelector("h5");

let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h5.innerHTML = `${day} ${hour}:${minutes}`;

function showCurrentTemperature(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon-main");
  let temperature = Math.round(response.data.main.temp);
  let temperatureMain = document.querySelector("#temperature");
  let weatherCond = document.querySelector("#weather-condition");
  let humidity = Math.round(response.data.main.humidity);
  let humidityMain = document.querySelector("#humidity-main");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");

  celsiusTemperature = response.data.main.temp;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperatureMain.innerHTML = `${temperature}`;
  windSpeed.innerHTML = `Wind: ${wind} Km/h`;
  weatherCond.innerHTML = response.data.weather[0].description;
  humidityMain.innerHTML = `Humidity: ${humidity}%`;
  //Based off humidity level anything above 50% can cause the air
  //quality to be bad for sensitive groups
  let airQuality = document.querySelector("#air-quality");
  if (humidity < 50) {
    airQuality.innerHTML = `Air Quality: Good 👍`;
  } else {
    airQuality.innerHTML = `Air Quality: Bad 👎`;
  }
}

function searchCity(city) {
  let apiKey = "734f282e7f8aa78f2c9c1a2c6230861d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  //console.log(apiUrl);
  searchCity(city);
}

function showPosition(position) {
  //console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiKey = "734f282e7f8aa78f2c9c1a2c6230861d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  //console.log(apiUrl);
  axios.get(`${apiUrl}&appid=(${apiKey}`).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
searchCity("Phoenix");
