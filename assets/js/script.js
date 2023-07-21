let weather = {
    apiKey: "5f08a7e3ed8b4d6680d35453232107",
    grabWeather: function () {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=5f08a7e3ed8b4d6680d35453232107&q=London&days=5&aqi=no&alerts=no")
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

};


