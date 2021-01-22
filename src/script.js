//current day & time
let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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

let day = days[now.getDay()];


h3.innerHTML= `${day} ${hours}:${minutes}`;


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


function sunriseSunsetHours(timestamp) {
  let sunriseSunset = new Date(timestamp);
  let hours = sunriseSunset.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = sunriseSunset.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//display Weather Response
function displayWeather (response) {
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML=Math.round(response.data.main.humidity);
document.querySelector("#Wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML=response.data.weather[0].description;
document.querySelector("#Sunrise").innerHTML = sunriseSunsetHours((response.data.sys.sunrise  + response.data.timezone)* 1000);
document.querySelector("#Sunset").innerHTML = sunriseSunsetHours((response.data.sys.sunset  + response.data.timezone) * 1000);
document.querySelector("#date").innerHTML = formatHours((response.data.dt + response.data.timezone) * 1000);

celsiusTemperature = response.data.main.temp;


let iconElement=document.querySelector("#CurrentWeatherIcon");
iconElement.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
}








function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}





//search city
function search(city) {
    let apiKey = "e516d42d482ea540c36ea946d29ffcbe";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    search(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

//current Location
function searchLocation(position) {
  let apiKey = "e516d42d482ea540c36ea946d29ffcbe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function getCurrentLocation (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}




let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation); 









function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#Celsius-Link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



search("Stockholm");