const apiKey = "3b9c7659c1e22086c869d3573489429a";

// FUNCTION EXPRESSION WITH TWO PARAM, UNITS HAVE A DEFAULT VALUE 'METRIC' IF THERE IS NO SPECIFIC USER INPUT
const getWeather = (city, units = 'metric') => {
    // FETCH API RETURN A PROMISE OBJECT
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)

    // THEN METHOD ACCESS RESPONSE OBJECT
    .then(response => {
        if(!response.ok) {
            throw new Error("Unable to fetch weather data for the specified location.");
        }
        return response.json();
    })
    // THEN METHOD ACCESS DATA OBJECT
    .then(data => {
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        return `Temperature: ${temp}°${units === 'metric' ? 'C' : 'F'}\nWeather: ${weather}`;
    })
    // CATCH METHOD ACCESS ERROR OBJECT
    .catch(error => {
        return `Error: ${error.message}`;
    })
}

// EVENT LISTENER FOR BUTTON CLICK
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const unitsInput = document.querySelector('input[name="units"]:checked').value;

    // FUNCTION CALL AFTER VALIDATING CITY INPUT
    if(cityInput) {
        getWeather(cityInput, unitsInput).then(result => {
            document.getElementById('weatherResult').innerText = result;
        });
    } else {
        document.getElementById('weatherResult').innerText = "Please enter a valid city.";
    }
});
