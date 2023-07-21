// Get references to the elements on the page
const cityInput = document.querySelector('#city-input');
const airQualityContainer = document.querySelector('#air-quality');

// API key for the air quality API
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
  if (airQualityData && airQualityData.data) {
    const aqi = airQualityData.data.aqi;
    airQualityContainer.querySelector('.aqi').textContent = aqi;
    // Add more air quality information here, e.g., pollutant levels, etc.
  } else {
    airQualityContainer.innerHTML = 'Air quality data not available.';
  }
};

// Function to handle form submission
const formSubmitHandler = async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    const airQualityData = await fetchAirQualityData(city);

    if (airQualityData) {
      displayAirQuality(airQualityData);
    } else {
      airQualityContainer.innerHTML = 'Air quality data not available.';
    }
  } else {
    airQualityContainer.innerHTML = '';
  }
};

// Add event listener to the form
const weatherForm = document.querySelector('#weather-form');
weatherForm.addEventListener('submit', formSubmitHandler);
