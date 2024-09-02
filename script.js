const apiKey = "3b9c7659c1e22086c869d3573489429a";

// FUNCTION EXPRESSION
const getWeather = (city, units = 'metric') => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to fetch weather data for the specified location.");
        }
        return response.json();
    })
    .then(data => {
        // Using template literals to generate the HTML structure
        return `
            <div class="weather-container">
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°${units === 'metric' ? 'C' : 'F'} (Feels like: ${data.main.feels_like}°)</p>
                <p><strong>Min Temp:</strong> ${data.main.temp_min}°</p>
                <p><strong>Max Temp:</strong> ${data.main.temp_max}°</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s at ${data.wind.deg}°</p>
                <p><strong>Visibility:</strong> ${data.visibility} meters</p>
                <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
            </div>
        `;
    })
    .catch(error => {
        return `<p>Error: ${error.message}</p>`;
    });
}

// EVENT LISTENER FOR BUTTON CLICK
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const unitsInput = document.querySelector('input[name="units"]:checked').value;

    // FUNCTION CALL AFTER VALIDATING CITY INPUT
    if (cityInput) {
        getWeather(cityInput, unitsInput).then(result => {
            const weatherResultContainer = document.getElementById('weatherResult');
            weatherResultContainer.innerHTML = result; // Directly set the innerHTML
        });
    } else {
        const weatherResultContainer = document.getElementById('weatherResult');
        weatherResultContainer.innerHTML = "<p>Please enter a valid city.</p>";
    }
});
