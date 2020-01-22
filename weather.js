
var city = "New York"
var apiKey = "e377cfd09121f92909adfe704738ccd1";
var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


$.ajax({url: weatherURL, method: "GET"})
.done(function(weatherInfo){

    console.log(weatherInfo)

    var cityName = weatherInfo.name;
    var icon = weatherInfo.weather[0].icon
    console.log(cityName)
    $("#temp").append("<p>" + cityName + "</p>");
    $("#temp").append(`<img src="http://openweathermap.org/img/w/${icon}.png">`);


    



//     City


// Date


// Icon image (visual representation of weather conditions)


// Temperature


// Humidity


// Wind speed


// UV index

})