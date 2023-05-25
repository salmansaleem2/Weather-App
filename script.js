"use strict";

const searchText = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-icon");
const weatherContainer = document.querySelector(".weather-container");
const btnModal = document.querySelector(".modal button");
const modal = document.querySelector(".modal");
const ModalText = document.querySelector(".modal ");
const overlay = document.querySelector(".overlay");
let x = document.getElementById("demo");
const spinner = document.querySelector(".spinner");

// const appId = e0b39b0b837d53f4aa8f0d3e9bb7b60d;
// function apiCall() {
//   fetch(
//     `api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1bc4821c828fbe336477348d8bd7271c`
//   )
//     .then((res) => console.log(res))
//     .then((data) => console.log(data));
//   console.log(countryWeather.json());
//   fetch(
//     "api.openweathermap.org/data/2.5/weather?q=London&APPID=1bc4821c828fbe336477348d8bd7271c"
//   )
//     .then((response) => console.log(response.json()))
//     .then((json) => console.log(json));
// }

const weatherData = async function (city = "") {
  // try {
  displayLoading();
  const fetchPromise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchText.value.trim()}${city}&APPID=1bc4821c828fbe336477348d8bd7271c`
  );
  const res = await fetchPromise.json();
  hideLoading();
  console.log(res.cod);

  const {
    name,
    dt,
    main: { humidity, temp },
    wind: { speed },
  } = res;
  const [{ description, icon }] = res.weather;
  let btn = `<button>aksjdd</button>`;
  const html = `
    <main class="weather-container">
    <div class="city-name">${name}</div>
    <div class="day-time">Thursday 1:47</div>
    <div class="few-clouds">${description}</div>
    <div class="weather-data">
      <div class="cel">${Math.ceil(temp - 273.15)}&#8451;</div>
      <div class="img-box">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
      </div>
      <div>
        <div class="humid">Humid: ${humidity}%</div>
        <div class="wind">Wind: ${speed.toFixed(1)}km/h</div>
      </div></div>
    </main>`;
  weatherContainer.insertAdjacentHTML("beforeend", html);
  // } catch (error) {
  //   console.log(ModalText.textContent);
  //   console.log(error.message);
  // }
};

// const weatherTemplate = () => {
//   const res = fetchPromise.json();
//   const {
//     name,
//     dt,
//     main: { humidity, temp },
//     wind: { speed },
//   } = res;
//   const [{ description, icon }] = res.weather;
//   let btn = `<button>aksjdd</button>`;
//   const html = `
// <main class="weather-container">
// <div class="city-name">${name}</div>
// <div class="day-time">Thursday 1:47</div>
// <div class="few-clouds">${description}</div>
// <div class="weather-data">
//   <div class="cel">${Math.ceil(temp - 273.15)}&#8451;</div>
//   <div class="img-box">
//     <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
//   </div>

//   <div>
//     <div class="humid">Humid: ${humidity}%</div>
//     <div class="wind">Wind: ${speed.toFixed(1)}km/h</div>
//   </div></div>
// </main>`;
//   weatherContainer.insertAdjacentHTML("beforeend", html);
// };

function EmptyField() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function displayLoading() {
  spinner.classList.add("active");
}
function hideLoading() {
  spinner.classList.remove("active");
}
searchIcon.addEventListener("click", function () {
  searchText.value.length !== 0 ? weatherData() : EmptyField();
  searchText.value = "";
});

btnModal.addEventListener("click", function () {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});
overlay.addEventListener("click", function () {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

// Get Geolocation
function getLocation() {
  console.log("it work");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  console.log("it work");
}
function showPosition(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  currentPosition(position.coords.latitude, position.coords.longitude);
  // x.innerHTML =
  //   "Latitude: " +
  //   position.coords.latitude +
  //   "<br>Longitude: " +
  //   position.coords.longitude;
}

const currentPosition = async function (lat, log) {
  console.log("latitude", lat, log);
  const fetchPromise = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${log}&key=c31178b1eb38434b8832a79d04fee5ff`
  );
  const res = await fetchPromise.json();
  const [
    {
      components: { city },
    },
  ] = res.results;
  console.log(res.results);
  console.log(city);
  weatherData(city);
};
