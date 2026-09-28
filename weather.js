const apiKey = "a3f11a474866fffdf01ce30d1c22cabb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const input = document.querySelector("#input");
const button = document.querySelector("#input-row button");

async function getWeather(city) {
    city = city.trim();

    if (city === "") {
        alert("Enter a city!");
        document.querySelector("#weather").style.display = "none";
        input.focus();
        return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
        alert("City not found!");
        document.querySelector("#weather").style.display = "none";
        input.value = "";
        input.focus();
        return;
    }
    const data = await response.json();

    // console.log(data);

    document.querySelector("#city").textContent = data.name;
    document.querySelector("#temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector("#feels-like").textContent = "Feels like: " + Math.round(data.main.feels_like) + "°C";
    document.querySelector("#humidity").textContent = "Humidity: " + data.main.humidity + "%";
    document.querySelector("#wind").textContent = "Wind Speed: " + data.wind.speed + " m/s";

    document.querySelector("#weather").style.display = "block";
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