// Get references to the elements on the page
const cityInput = document.querySelector('#city-input');
// const weatherInfoContainer = document.querySelector('#weather-info');
const airQualityContainer = document.querySelector('#air-quality');

// API keys for weather and air quality APIs
// const weatherApiKey = 'YOUR_WEATHER_API_KEY';
const airQualityApiKey = '633bb82208f93a5f0a8409af99aa77ce180a2c4e';

// Function to fetch air quality data from the air quality API
const fetchAirQualityData = async (city) => {
  try {
    const response = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${airQualityApiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};

// Function to display air quality information on the page
const displayAirQuality = (airQualityData) => {
  // Update the airQualityContainer with the air quality data
  // Add code to display AQI, pollutant levels, etc.
};

// Function to handle form submission
const formSubmitHandler = async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    // const weatherData = await fetchWeatherData(city); // Commented out weather-related code

    const airQualityData = await fetchAirQualityData(city);

    // if (weatherData) {
    //   displayWeatherInfo(weatherData); // Commented out weather-related code
    // } else {
    //   weatherInfoContainer.innerHTML = 'Weather data not available.'; // Commented out weather-related code
    // }

    if (airQualityData) {
      displayAirQuality(airQualityData);
    } else {
      airQualityContainer.innerHTML = 'Air quality data not available.';
    }
  } else {
    // weatherInfoContainer.innerHTML = 'Please enter a city name.'; // Commented out weather-related code
    airQualityContainer.innerHTML = '';
  }
};

// Add event listener to the form
const weatherForm = document.querySelector('#weather-form');
weatherForm.addEventListener('submit', formSubmitHandler);
