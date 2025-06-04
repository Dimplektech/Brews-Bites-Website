document.addEventListener('DOMContentLoaded',function(){
    // Weather API KEY
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    const weatherContainer = document.getElementById("weather-suggestion");

    //only run ehen weather-suggestion element exits
    if(!weatherContainer) return;

    //Get User Location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`User Location: Latitude: ${lat}, Longitude: ${lon}`);
            getWeather(lat,lon);

        },// Error callback - enhanced with specific error handling
            function(error) {
                console.log('Geolocation error:', error.code, error.message);
                
                // Show specific error message based on error code
                let errorMsg;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = "Location access was denied. Using default recommendations.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = "Location information is unavailable. Using default recommendations.";
                        break;
                    case error.TIMEOUT:
                        errorMsg = "Location request timed out. Using default recommendations.";
                        break;
                    default:
                        errorMsg = "An unknown error occurred. Using default recommendations.";
                        weatherContainer.innerHTML = `<p class="error-message">${errorMsg}</p>`;
                        setTimeout(() => {
                            showDefaultRecommendations(); 
                        }, 1500);
                 }    
                },
                 // Options to help with timeout issues
                { 
                    enableHighAccuracy: false,
                    timeout: 10000,      // Increased timeout
                    maximumAge: 60000    // Accept coordinates up to 1 minute old
                });
                     
             
    } else {
         weatherContainer.innerHTML = `
            <p>Weather-based suggestions are not available in your browser.</p>
            <div class="suggestion-default">
                <h4>Our Classic Recommendations</h4>
                <div class="suggestion-items">
                    <div class="suggestion-item">
                        <img src="assets/images/coffee/latte.jpg" alt="Latte">
                        <span>Latte</span>
                    </div>
                    <div class="suggestion-item">
                        <img src="assets/images/tea/chai-latte.jpg" alt="Chai Latte">
                        <span>Chai Latte</span>
                    </div>
                </div>
            </div>
        `;
    }

    function handleLocationError(error) {
        console.log('Geolocation error:', error);
        // Show default recommendations if location access is denied
        showDefaultRecommendations();
    }
    function getWeather(lat, lon){
        fetch(`${API_URL}?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&hourly=temperature_2m,weather_code`)
        .then(response =>{
            if(!response.ok){
                throw new Error("Weather data not available!");
            }
            return response.json();
        })
        .then(data => {
            processWeatherData(data);
        })
        .catch(error =>{
            console.error("Error fetching weather data:",error);
            showDefaultRecommendations();
        });

    }    
    function processWeatherData(data){
        // Get current hour to retrive current temp and weather code
        const currentHour = new Date().getHours();
        const temp = data.hourly.temperature_2m[currentHour];
        const weatherCode =data.hourly.weather_code[currentHour];

        // get Sunrise/sunset from daily data(first day)
        const sunrise = new Date(data.daily.sunrise[0]).getHours();
        const sunset =new Date(data.daily.sunset[0]).getHours();

        const isDaytime= currentHour >= sunrise && currentHour < sunset;

        // Convert WMO weather code to a readable description
        const weatherDescription = getWeatherDescription(weatherCode);

        // Get drink Suggestions based on weather and time of the day
        const drinkSuggestions = getDrinkSuggestions(temp, weatherCode,isDaytime);
  

        // Clear previous content
        weatherContainer.innerHTML = '';
        // Update the UI
        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-icon">
                    <i class="${getWeatherIcon(weatherCode, isDaytime)}"></i>
                </div>
                <div class="weather-details">
                    <h4>Current Weather</h4>
                    <p>${Math.round(temp)}°C | ${weatherDescription}</p>
                </div>
            </div>
            <div class="suggestion-title">
                <h4>Perfect for today's weather:</h4>
            </div>
            <div class="suggestion-items">
                ${drinkSuggestions.map(drink => `
                    <div class="suggestion-item">
                        <img src="${drink.image}" alt="${drink.name}">
                        <span>${drink.name}</span>
                        <p>${drink.description || ''}</p>
                        <a href="menu.html" class="order-button">
                           Order Now
                        </a>
                    </div>
                `).join('')}
            </div>
        `;


    }

    function getWeatherDescription(code) {
        const weatherCodes = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Drizzle light",
            53: "Drizzle moderate",
            55: "Drizzle dense intensity",
            56: "Freezing drizzle light",
            57: "Freezing drizzle dense intensity",
            61: "Rain slight",
            63: "Rain moderate",
            65: "Rain heavy intensity",
            66: "Freezing rain light",
            67: "Freezing rain heavy intensity",
            71: "Snow fall slight",
            73: "Snow fall moderate",
            75: "Snow fall heavy intensity",
            77: "Snow grains",
            80: "Rain showers slight",
            81: "Rain showers moderate",
            82: "Rain showers violent",
            85: "Snow showers slight",
            86: "Snow showers heavy",
            95: "Thunderstorm slight or moderate",
            96: "Thunderstorm with slight hail",
            99: "Thunderstorm with heavy hail"
        };
        return weatherCodes[code] || "Unknown weather condition";
    }   

    function getWeatherIcon(code,isDaytime){
        // Map Weather codes to Font Awsome icons
        if (code === 0) {
            return isDaytime ? 'fas fa-sun' : 'fas fa-moon';
        } else if (code <= 3) {
            return isDaytime ? 'fas fa-cloud-sun' : 'fas fa-cloud-moon';
        } else if (code <= 48) {
            return 'fas fa-smog'; // Fog
        } else if (code <= 55) {
            return 'fas fa-cloud-rain'; // Drizzle
        } else if (code <= 65) {
            return 'fas fa-cloud-showers-heavy'; // Rain
        } else if (code <= 77) {
            return 'fas fa-snowflake'; // Snow
        } else if (code <= 82) {
            return 'fas fa-cloud-rain'; // Rain showers
        } else {
            return 'fas fa-bolt'; // Thunderstorm
        }

    }
    

    function getDrinkSuggestions(temp, weatherCode, isDaytime){
        //Hot Weather suggestions
        if(temp>25){
            return [
                {name:"Iced Coffee",image : "assets/images/coffee/iced-coffee.jpg", description: "A refreshing iced coffee to cool you down." },
                {name:"Iced Tea",image:"assets/images/tea/iced-tea.jpg", description: "A chilled iced tea with a hint of lemon."},
            ]
        }

        // Cold Weather Suggestions
        if(temp<15){
            return [
                {name:"Hot Chocolate", image:"assets/images/coffee/hot-chocolate.jpg", description: "A warm and comforting hot chocolate."},
                {name:"Spiced Tea", image:"assets/images/tea/spiced-tea.jpg", description: "A spiced tea to warm you up."},
            ]
        }
        //Rainy Weather Suggestions
        if(weatherCode >= 51 && weatherCode <= 82){
            return [
                {name:"Cappuccino", image:"assets/images/coffee/cappuccino.jpg", description: "A rich cappuccino to enjoy while listening to the rain."},
                {name:"Earl Grey", image:"assets/images/tea/earl-grey.jpg", description: "A classic Earl Grey tea with bergamot."},
            ]
        }

         // Sunny weather
        else if (weatherCode === 0) {
            if (isDaytime) {
                return [
                    { 
                        name: 'Latte', 
                        image: 'assets/images/special-coffee.jpg',
                        description: 'A refreshing latte to enjoy in the sun.'

                    },
                    { 
                        name: 'Green Tea', 
                        image: 'assets/images/pastry.jpg',
                        description: 'A light green tea to keep you cool.'
                    }
                ];
            } else {
                return [
                    { 
                        name: 'Espresso', 
                        image: 'assets/images/special-coffee.jpg',
                        description: 'A strong espresso to warm you up at night.'
                    },
                    { 
                        name: 'Chamomile', 
                        image: 'assets/images/pastry.jpg' ,
                        description: 'A calming chamomile tea to relax before bed.'
                    }
                ];
            }
        }
        
        // Default suggestions
        else {
            return [
                { 
                    name: 'Mocha', 
                    image: 'assets/images/coffee/cafe-mocha.jpg',
                    description: 'A rich mocha to enjoy any time of day.'

                },
                { 
                    name: 'Green Tea', 
                    image: 'assets/images/tea/green-tea.jpg',
                    description: 'A soothing green tea to refresh you.'
                }
            ];
        }    
    }

    function showDefaultRecommendations(){
        weatherContainer.innerHTML = `
            <div class="suggestion-default">
                <h4>Our Top Recommendations</h4>
                <div class="suggestion-items">
                    <div class="suggestion-item">
                        <img src="assets/images/coffee/latte.jpg" alt="Latte">
                        <span>Latte</span>
                        <p> Experience the creamy delight of our classic latte.</p>
                    </div>
                    <div class="suggestion-item">
                        <img src="assets/images/coffe/cafe-mocha" alt="Mocha">
                        <span>Mocha</span>
                        <p> Indulge in the rich chocolatey goodness of our mocha.</p>
                        <a href="menu.html" class="order-button">
                           Order Now
                        </a>
                    </div>
                </div>
            </div>
        `;
    }



})