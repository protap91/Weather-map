let apikey = "9a536e6685265eb15de2af6921cd6730";

let url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let weatherImg = document.querySelector(".weather-icon img");
let search = document.querySelector(".weather-search input");
search.addEventListener("keydown", e => {
  if (e.key === "Enter") getWeather(search.value.trim());
});
let btn = document.querySelector('button');
btn.addEventListener('click', async () => {
  // console.log('button was clicked ');
  getWeather(search.value.trim());
});

async function getWeather(city) {
  if (!city) return;

  let res = await fetch(url + encodeURIComponent(city) + `&appid=${apikey}`);

  if (!res.ok) {
    alert("Request failed");
    return;
  }

  let data = await res.json();

  // validate response first
  if (data.cod !== 200) {
    alert("City not found. Check spelling.");
    return;
  }

  // console.log(data.weather[0].main);

  let condition = data.weather[0].main;

  if (condition === "Clouds") {
    weatherImg.src = "img/clouds.png";
  } else if (condition === "Clear") {
    weatherImg.src = "img/clear.png";
  } else if (condition === "Rain") {
    weatherImg.src = "img/rain.png";
  } else if (condition === "Drizzle") {
    weatherImg.src = "img/drizzle.png";
  } else if (condition === "Thunderstorm") {
    weatherImg.src = "img/thunder.png";
  } else if (condition === "Snow") {
    weatherImg.src = "img/snow.png";
  } else {
    weatherImg.src = "img/mist.png";
  }

  document.querySelector(".weather-main h2").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = data.main.temp + "°C";
  document.querySelector(".details").innerHTML =
    "💧 " + data.main.humidity + "% &nbsp;&nbsp;🌬 " +
    (data.wind.speed * 3.6).toFixed(1) + " km/h";

  search.value = "";
  search.focus();
}
