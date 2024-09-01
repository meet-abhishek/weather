const apiKey = "3b9c7659c1e22086c869d3573489429a";

const getWeather = (city, units = 'metric') => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
    .then(response => {
        if(!response.ok) {
            throw new Error("Neliyampathy vazhi poku...");
        }
        return response.json();
    })
    .then(data => {
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        return `Temperature: ${temp}°${units === 'metric' ? 'C' : 'F'}\n Weather: ${weather}`;
    })
    .catch(error => {
        return `Error: ${error.message}`;
    })
}

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const unitsInput = document.querySelector('input[name="units"]:checked').value;

    if(cityInput) {
        getWeather(cityInput, unitsInput).then(result => {
            document.getElementById('weatherResult').innerText = result;
        });
    }
    else {
        document.getElementById('weatherResult').innerText = "Please Enter the FUCKING city"
    }
});