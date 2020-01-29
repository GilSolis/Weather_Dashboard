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
    $(".city-and-date").append("<b>"+ cityName + " " + "</b>");
    $(".city-and-date").append("<b>"+ currentDate + " " + "</b>");
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

//function for getting UV index
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
        $(".weather-info").append("<p id='uv'>" + "UV Index: " + "</p>");
		var uvBtn = $("<button>").text(uvValue);
		$("#uv").append(uvBtn);
		//button styles
		if (uvValue < 3) {
			uvBtn.css("background-color", "Green");
		} else if (uvValue < 6) {
			uvBtn.css("background-color", "Yellow");
		} else if (uvValue < 8) {
			uvBtn.css("background-color", "Orange");
		} else if (uvValue < 11) {
			uvBtn.css("background-color", "Red");
		} else {
			uvBtn.css("background-color", "Purple");
		}
    })
}

var candy = "Seattle";
function fiveDay(candy) {
	var fiveURL = `https://api.openweathermap.org/data/2.5/forecast?q=${candy}&appid=${apiKey}`;
    console.log(fiveURL);
    $.ajax({
		url: fiveURL,
		method: "GET"
	}).then(function(response) {
        console.log(response);
        var day = 1;
        for (var i = 1; i < response.list.length; i+=8) {
            console.log(response.list[i]);
            var nextDay = moment.unix(response.list[i].dt).utc().format("L");
            console.log(nextDay);
            $(".forecastCards").append('<div id="day'+day+'" >' + "<b>" + nextDay + "</b>" + "</div>")
            var forecastIcon = response.list[i].weather[0].icon
            $(`#day${day}`).append("<p>" + `<img src="http://openweathermap.org/img/w/${forecastIcon}.png">`+ "</p>")
            var kelvin = response.list[i].main.temp;
            var fahrenheit  = ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
            $(`#day${day}`).append("<p>"+"Temp: " + fahrenheit  + " °F"+"</p>")
            var humidity = response.list[i].main.humidity
            $(`#day${day}`).append("<p>"+"Humidity: " + humidity + "</p>")

           day++
       }


    })
}

fiveDay(candy);

// })
// }


// City


// Date


// Icon image (visual representation of weather conditions)


// Temperature


// Humidity


// Wind speed


// UV index