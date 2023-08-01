
// This function is used to fetch data from api
let weather = {
    // Sets api key to a property that can be referenced
    apiKey: "5f08a7e3ed8b4d6680d35453232107",
    grabWeather: function (city) {
        fetch("https://api.weatherapi.com/v1/current.json?key="+this.apiKey+"&q=" + city +"&aqi=no")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    
        fetch("https://api.weatherapi.com/v1/forecast.json?key="+this.apiKey+"&q=" + city +"&days=3")
            .then((response) => response.json())
            .then((data) => forecastDisplay(data));
    },
    
    // Using the data pulled from the api, the function will then call for specific data in the api and display them onto the html
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
        // Adds the last name and country to localstorage
        localStorage.setItem("last-updated", name+", "+country)
    },
    // Function to grab input value and add it to another function
    grab: function() {
     this.grabWeather(document.querySelector("#city-input").value)
     // Pulls the saved data from localstorage to display on page
     document.querySelector(".last-updated").innerHTML= localStorage.getItem("last-updated")
    },

    // Function checks input and displays message to respond accordingly if user input is empty or not valid
    validateForm: function(){
    const x = document.querySelector("#city-input").value
        if (x === ""){
            document.querySelector(".currentCity").innerHTML= "Please Enter A City"
        } else (this.weatherDisplay === 400)
            document.querySelector(".currentCity").innerHTML= "Please Enter A City"
            document.querySelector(".temperature").innerHTML="City Not Found"
            document.querySelector(".wind").innerHTML="City Not Found"
            document.querySelector(".humidity").innerHTML="City Not Found"
    }
};  

// Adds eventlistener function to the
document.querySelector(".submitBtn").addEventListener("click", function(){
  weather.grab();
  weather. validateForm();
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
