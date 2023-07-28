let weather = {
    apiKey: "5f08a7e3ed8b4d6680d35453232107",
    grabWeather: function (city) {
        fetch("http://api.weatherapi.com/v1/current.json?key=5f08a7e3ed8b4d6680d35453232107&q=" + city +"&aqi=no")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    
        fetch("http://api.weatherapi.com/v1/forecast.json?key=5f08a7e3ed8b4d6680d35453232107&q=" + city +"&days=3")
            .then((response) => response.json())
            .then((data) => forecastDisplay(data));
    },
    
    weatherDisplay: function(data) {
        var { name, country } = data.location;
        var { temp_f } = data.current;
        var { wind_mph }= data.current
        var { humidity} = data.current
        console.log(name, country, temp_f,)
        document.querySelector(".currentCity").innerHTML= name + ", " + country
        document.querySelector(".temperature").innerHTML=temp_f + " F"
        document.querySelector(".wind").innerHTML=wind_mph + " MPH"
        document.querySelector(".humidity").innerHTML=humidity + " %"
    },
    find: function() {
     this.grabWeather(document.querySelector("#city-input").value)
    }
};  

document.querySelector(".submitBtn").addEventListener("click", function(){
  weather.find();
}) 

// Function to display forecast
function forecastDisplay(data) {
    // Select the HTML element where the forecast will be displayed
    const forecastContainer = document.querySelector(".forecast");

    // Clear previous forecast data
    forecastContainer.innerHTML = '';

    // Loop over the forecast data
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        // Get the forecast for a specific day
        const dayForecast = data.forecast.forecastday[i];

        // Create a new element for the day's forecast
        const dayElement = document.createElement('div');

        // Add data to the element
        dayElement.innerHTML = `
        <h4>${dayForecast.date}</h4>
        <p>Temperature: ${dayForecast.day.avgtemp_f} F</p>
        <p>Humidity: ${dayForecast.day.avghumidity}%</p>
        <p>Conditions: ${dayForecast.day.condition.text}</p>
        `;

        // Add the new element to the forecast container
        forecastContainer.appendChild(dayElement);
    }
}


