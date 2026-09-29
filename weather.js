const apiKey = "a3f11a474866fffdf01ce30d1c22cabb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.getElementById("input");
const button = document.querySelector("#input-row button");
const weather = document.getElementById("weather");

async function getWeather(city) {
    city = city.trim();

    if (city === "") {
        alert("Enter a city!");
        weather.style.display = "none";
        input.focus();
        return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        alert("City not found!");
        weather.style.display = "none";
        input.value = "";
        input.focus();
        return;
    }
    const data = await response.json();

    // console.log(data);

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
    document.getElementById("feels-like").innerHTML = "Feels like: <strong>" + Math.round(data.main.feels_like) + "°C </strong>";
    document.getElementById("humidity").innerHTML = "Humidity: <strong>" + data.main.humidity + "% </strong>";
    document.getElementById("wind").innerHTML = "Wind Speed: <strong>" + data.wind.speed + " m/s </strong>";

    weather.style.display = "block";
    input.value = "";
}

button.addEventListener("click", function () {
    getWeather(input.value);
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather(input.value);
    }
});