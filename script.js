// ======================================
// OPENWEATHER API KEY
// ======================================

// Replace this with your own API key
const apiKey = "6899be68be28d23fb4cfcee3f8e7bc80";


// ======================================
// SELECT HTML ELEMENTS
// ======================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");

const weatherIcon = document.querySelector(".weather-icon");


// ======================================
// SEARCH BUTTON EVENT
// ======================================

searchBtn.addEventListener("click", () => {

    const cityName = cityInput.value.trim();

    if(cityName === "")
    {
        alert("Please enter a city name.");
        return;
    }

    getWeather(cityName);

});


// ======================================
// ENTER KEY EVENT
// ======================================

cityInput.addEventListener("keydown",(event)=>{

    if(event.key==="Enter")
    {
        searchBtn.click();
    }

});

// ======================================
// GET WEATHER FUNCTION
// ======================================

async function getWeather(cityName) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        temperature.textContent = `${Math.round(data.main.temp)}°C`;

        city.textContent = `${data.name}, ${data.sys.country}`;

        description.textContent = data.weather[0].description;

        humidity.textContent = `${data.main.humidity}%`;

        wind.textContent = `${data.wind.speed} m/s`;

        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

        pressure.textContent = `${data.main.pressure} hPa`;
    } catch (error) {

        alert(error.message);

    }

}