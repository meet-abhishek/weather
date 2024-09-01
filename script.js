const apiKey = "3b9c7659c1e22086c869d3573489429a";

// Fetch weather data based on city input
const getWeather = (city, units = 'metric') => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
        .then(response => {
            if (!response.ok) {
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
        });
};

// Fetch city names based on user input
const getCitySuggestions = (input) => {
    return fetch(`https://api.teleport.org/api/urban_areas/slug:${input}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No suggestions available.");
            }
            return response.json();
        })
        .then(data => {
            return data._embedded['ua:scores'].map(city => city.name);
        })
        .catch(error => {
            return [];
        });
};

// Event listener for weather button
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value.trim();
    const unitsInput = document.querySelector('input[name="units"]:checked').value;

    if (cityInput) {
        getWeather(cityInput, unitsInput).then(result => {
            document.getElementById('weatherResult').innerText = result;
        });
    } else {
        document.getElementById('weatherResult').innerText = "Please Enter the FUCKING city";
    }
});

// Event listener for city input
document.getElementById('cityInput').addEventListener('input', (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    
    if (inputValue.length > 2) { // Only fetch suggestions for more than 2 characters
        getCitySuggestions(inputValue).then(suggestions => {
            const suggestionBox = document.getElementById('suggestionBox');
            suggestionBox.innerHTML = '';
            
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.className = 'suggestion-item';
                div.onclick = () => {
                    document.getElementById('cityInput').value = suggestion;
                    suggestionBox.innerHTML = ''; // Clear suggestions
                };
                suggestionBox.appendChild(div);
            });
        });
    }
});
