function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector(".city-name");
  let countryElement = document.querySelector(".country-name");
  let windSpeedElement = document.querySelector(".wind-speed");
  let descriptionElement = document.querySelector(".weather-description");
  let dateElement = document.querySelector(".day-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function searchCity(city) {
  let apiKey = "ff4e01btd323751oc4afa5a4c3e73777";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function showFahrenheitUnits(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusUnits.classList.remove("active");
  fahrenheitUnits.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusUnits(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusUnits.classList.add("active");
  fahrenheitUnits.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitUnits = document.querySelector("#fahrenheit-units");
fahrenheitUnits.addEventListener("click", showFahrenheitUnits);

let celsiusUnits = document.querySelector("#celsius-units");
celsiusUnits.addEventListener("click", showCelsiusUnits);
