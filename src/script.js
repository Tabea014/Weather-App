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

//display Weather Response
function displayWeather (response) {
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML=Math.round(response.data.main.humidity);
document.querySelector("#Wind").innerHTML=Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML=response.data.weather[0].main;
}

//search city
function search(city) {
    let apiKey = "e516d42d482ea540c36ea946d29ffcbe";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
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
}


function getCurrentLocation (event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation); 

search("Stockholm");