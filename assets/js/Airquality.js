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
  // Clear previous air quality data except AQI
  const pmDataElements = airQualityContainer.querySelectorAll('.pm-data');
  pmDataElements.forEach((element) => element.remove());

  if (airQualityData && airQualityData.data) {
    const aqi = airQualityData.data.aqi;
    airQualityContainer.querySelector('.aqi').textContent = `AQI: ${aqi}`;

    // Display other pollutant levels if available
    if (airQualityData.data.iaqi.pm25) {
      const pm25 = airQualityData.data.iaqi.pm25.v;
      const pm25Element = document.createElement('p');
      pm25Element.textContent = `PM2.5: ${pm25} µg/m³`;
      pm25Element.classList.add('pm-data');
      airQualityContainer.appendChild(pm25Element);
    }

    if (airQualityData.data.iaqi.pm10) {
      const pm10 = airQualityData.data.iaqi.pm10.v;
      const pm10Element = document.createElement('p');
      pm10Element.textContent = `PM10: ${pm10} µg/m³`;
      pm10Element.classList.add('pm-data');
      airQualityContainer.appendChild(pm10Element);
    }

    // Add more elements for other pollutant levels as needed
    // For example, you can add elements for NO2, O3, SO2, etc.

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
