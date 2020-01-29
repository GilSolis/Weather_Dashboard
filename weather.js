$(document).ready(function (){

// var city = '';
var apiKey = "e377cfd09121f92909adfe704738ccd1";
var cityArray = JSON.parse(localStorage.getItem('searchedCity'));

if (cityArray) {
    displayCurrentWeather(cityArray[0]);
    fiveDay(cityArray[0])
    displaySearchedCity(cityArray[0]);
} else {
    cityArray = []
}

// function to display searched cities.
function displaySearchedCity(){
    $(".city-card-body").empty();
    console.log(cityArray);
    // for loop over the cityarry and then dynamically append each item in the array to the city-card-body. 
    for (var i = 0; i < cityArray.length; i++) {
        var cityName = $("<p>");
        // Adding a class of new-city-p to <p>
        cityName.addClass("new-city-p");
        cityName.attr(cityArray[i]);
        // Providing the <p> text
        cityName.text(cityArray[i]);
        // Adding the button to the buttons-view div
        $(".city-card-body").append(cityName);
        // ending bracket for displaySearchedCity function
    }


}




function displayCurrentWeather(city){
        var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

        $.ajax({url: weatherURL, method: "GET"})
        .done(function(weatherInfo){

            $(".weather-info").empty();
            $(".city-and-date").empty();
            $("#main").empty();
            console.log(weatherInfo)
            var cityName = weatherInfo.name;
            var dt = weatherInfo.dt;
            // console.log(dateInfo);
            var currentDate = moment.unix(dt).format("L");
            // console.log("current date" + currentDate);
            var icon = weatherInfo.weather[0].icon
            console.log(cityName)
            $(".city-and-date").append("<b>" + cityName + "\xa0\xa0" + "</b>");
            $(".city-and-date").append("<b>" + currentDate  + "</b>");
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
    
    });
};

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

function fiveDay(city) {
	var fiveURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    console.log(fiveURL);
    $(".forecastCards").empty();
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

$('#search-button').on('click', function(event){
    event.preventDefault();
    var city = $( "#city-input" ).val().trim();
    cityArray.unshift(city);
    localStorage.setItem('searchedCity', JSON.stringify(cityArray))
    console.log(city);

    displayCurrentWeather(city);
    displaySearchedCity(city);
    fiveDay(city);


})
$(".city-card-body").on("click", ".new-city-p", function (event) {
    console.log(event.currentTarget.innerText);
    event.preventDefault();
    displayCurrentWeather(event.currentTarget.innerText);
    fiveDay(event.currentTarget.innerText);
})

})
