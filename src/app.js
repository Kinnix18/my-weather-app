function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector(".city-name");
  let countryElement = document.querySelector(".country-name");
  let windSpeedElement = document.querySelector(".wind-speed");
  let descriptionElement = document.querySelector(".weather-description");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  windSpeedElement.innerHTML = response.data.wind.speed;
  descriptionElement.innerHTML = response.data.condition.description;
}

let apiKey = "ff4e01btd323751oc4afa5a4c3e73777";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kyiv&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
