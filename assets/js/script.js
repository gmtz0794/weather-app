let weather = {
    apiKey: "5f08a7e3ed8b4d6680d35453232107",
    grabWeather: function (city) {
        fetch("http://api.weatherapi.com/v1/current.json?key=5f08a7e3ed8b4d6680d35453232107&q=" + city +"&aqi=no")
            .then((response) => response.json())
            .then((data) => this.weatherDisplay(data));
    },

    weatherDisplay: function(data) {
        var { name, country } = data.location;
        var { temp_f } = data.current;
        console.log(name, country, temp_f,)
        document.querySelector(".currentCity").innerHTML= name + ", " + country
        document.querySelector(".temperature").innerHTML=temp_f + " F"
    },
    find: function() {
     this.grabWeather(document.querySelector("#city-input").value)
    }
};  

document.querySelector(".submitBtn").addEventListener("click", function(){
  weather.find();
}) 


