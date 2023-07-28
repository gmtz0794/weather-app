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


