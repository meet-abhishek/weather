const apiKey = "3b9c7659c1e22086c869d3573489429a";

// FUNCTION EXPRESSION
const getWeather = (city, units) => {
    console.log(`Fetching weather data for ${city} at ${new Date().toLocaleTimeString()}`);
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to fetch weather data for the specified location.");
        }
        return response.json();
    })
    .then(data => {
        // Using template literals to generate the HTML structure
        const result = `
            <div class="weather-container">
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°${units === 'metric' ? 'C' : 'F'} (Feels like: ${data.main.feels_like}°)</p>
                <p><strong>Min Temp:</strong> ${data.main.temp_min}°</p>
                <p><strong>Max Temp:</strong> ${data.main.temp_max}°</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind:</strong> ${data.wind.speed} m/s at ${data.wind.deg}°</p>
                <p><strong>Visibility:</strong> ${data.visibility ? data.visibility : 'N/A'} meters</p>
                <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
                <h6 style="padding: 10px">Last updated at: ${new Date().toLocaleTimeString()}</h6>
            </div>
        `;
        document.getElementById('weatherResult').innerHTML = result;
    })
    .catch(error => {
        document.getElementById('weatherResult').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

let weatherUpdateInterval; // Variable to hold the interval ID

// EVENT LISTENER FOR BUTTON CLICK
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const unitsInput = document.querySelector('input[name="units"]:checked')?.value; // Get selected units

    // Clear any existing interval before setting a new one
    clearInterval(weatherUpdateInterval);

    if (cityInput) {
        const finalUnitsInput = unitsInput || 'metric'; // Default to 'metric' if no unit is selected
        getWeather(cityInput, finalUnitsInput);
        
        // Automatically update weather every 1 second
        weatherUpdateInterval = setInterval(() => {
            getWeather(cityInput, finalUnitsInput);
        }, 1000);
    } else {
        document.getElementById('weatherResult').innerHTML = "<p>Please enter a valid city.</p>";
    }
});

// CLEAR INPUT FIELD ON PAGE LOAD
window.addEventListener('load', () => {
    document.getElementById('cityInput').value = '';
});

// Initial call to fetch weather data immediately
getWeather('Kochi', 'metric');
