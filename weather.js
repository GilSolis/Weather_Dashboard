var city = '';
var apiKey = "e377cfd09121f92909adfe704738ccd1";

// $(document).ready(function (){
//     console.log(city);
//     $("#main").empty();
//     // var city = citiesArray[0];
//     // fiveDay(city);
//     searchCity();

// });

// function searchCity(){

$('#search-button').on('click', function(){
city = $( "#city-input" ).val();
console.log(city);

var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

$.ajax({url: weatherURL, method: "GET"})
.done(function(weatherInfo){

    console.log(weatherInfo)

    var cityName = weatherInfo.name;
    var dt = weatherInfo.dt;
    // console.log(dateInfo);
    var currentDate = moment.unix(dt).format("L");
    // console.log("current date" + currentDate);
    var icon = weatherInfo.weather[0].icon
    console.log(cityName)
    $(".city-and-date").append(cityName + " ");
    $(".city-and-date").append(currentDate + " ");
    $(".city-and-date").append(`<img src="http://openweathermap.org/img/w/${icon}.png">`);

    var kelvin = weatherInfo.main.temp;
    var fahrenheit  = ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
    $(".weather-info").append("<p>"+"Temperature: " + fahrenheit  + " °F"+"</p>");

    var humidity = weatherInfo.main.humidity;
    $(".weather-info").append("<p>"+"Humidity: " + humidity + "%"+"</p>");

    var windSpeed = weatherInfo.wind.speed;
	var newSpeed = (windSpeed * 2.2369).toFixed(2);
    $(".weather-info").append("<p>"+ "Wind Speed: " + newSpeed + " MPH"+"</p>");

    var lon = weatherInfo.coord.lon;
    var lat = weatherInfo.coord.lat;
    console.log("***" + lat);

    uvIndex(lon, lat);
    console.log(uvIndex);
    
})
})


function uvIndex(lon, lat) {
	var indexURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        console.log(indexURL);
    $.ajax({
		url: indexURL,
		method: "GET"
	}).done(function(uvInfo) {
        console.log(uvInfo)
        var uvValue = uvInfo.value;
        console.log(uvValue);

        
    })
}

// })
// }


// City


// Date


// Icon image (visual representation of weather conditions)


// Temperature


// Humidity


// Wind speed


// UV index