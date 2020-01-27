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
    var icon = weatherInfo.weather[0].icon
    console.log(cityName)
    $("#main").append("<p>" + cityName + "</p>");
    $("#main").append(`<img src="http://openweathermap.org/img/w/${icon}.png">`);
})
})
// })
// }