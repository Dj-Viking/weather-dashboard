// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// have the forecast unhide after selecting the city and updating to the document

//document variables
//  form input textarea element
//  
//select textarea element
const formInputTextAreaEl = document.querySelector("#city-name");
//  button element
const buttonEl = document.querySelector("#search-button");
//select the city list element we are prepending the city name to
const citylistEl = document.querySelector("#city-list");

//select element for the 5 day forecast dates
const forecastRowEl = document.querySelector("#forecast-row");

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=40f2f21382e4c53e0bf3d5733b6759dc&q=";


//moment variables and objects
function updateCurrentDate(){
    var nowDate = moment().format('MM/DD/YYYY');
    const currentDateEl = document.querySelector("#current-date");
    currentDateEl.textContent = nowDate;
}
//display current time in that city??
//for now will have time function here, maybe try to get local time of city?
// var updateTime = document.querySelector("#current-time")
// function time() {
//     var d = new Date();
//     var s = ('0'+ d.getSeconds()).slice(-2);
//     var m = ('0'+ d.getMinutes()).slice(-2);
//     var h = d.getHours(); 
//     if(h >= 12){
//         updateTime.textContent = h + ":" + m + ":" + s + " pm";
//     } else if (h <= 11){
//         updateTime.textContent = h + ":" + m + ":" + s + " am";
//     }
// }
//   setInterval(time, 1000);

//display the dates 1-5 days from current date

function getFiveDayForecastDates(){
    forecastRowEl.classList.remove("hide-before-append")
    for (i = 1; i < 6; i++){
        var startdate = moment().format("MM/DD/YYYY");
        var new_date = moment(startdate, "MM/DD/YYYY").add(i, 'days');
        var month = new_date.format('MM');
        var day = new_date.format('DD');
        var year = new_date.format('YYYY');
        var daySelectorEl = document.querySelector("#day-" + i + "-from-now")
        var daySelectorElDate = month + '/' + day + '/' + year

        //checking if this works, YAY!!
        //console.log(i);
        daySelectorEl.innerHTML = "<h6 class='text-light'>" + daySelectorElDate + "</h6>";
    }
}

function cityApiCall(searchedCity){
    fetch(
        apiUrl + searchedCity
    )
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(response){
        console.log(response);
        console.log("city name fetched from server");
        console.log(response.name);

        getCurrentWeatherIcon(response.weather[0].icon);
        
        // console.log(response.main.temp);
        getCurrentTemp(response.main.temp);
        getCurrentHumidity(response.main.humidity);
        getCurrentWindSpeed(response.wind.speed);
        getCurrentDescription(response.weather[0].description);

        
        var fetchedCityContainer = document.querySelector("#city-header");
        var fetchedCityEl = document.createElement("p");
        fetchedCityEl.classList = "city-alt";
        fetchedCityEl.textContent = "(" + response.name + ")";
        fetchedCityContainer.appendChild(fetchedCityEl);

    })
    
}

function tempConvKtoF(valNum) {
    valNum = parseFloat(valNum);
    var newTemp = Math.floor(((valNum-273.15)*1.8)+32);
    return newTemp;
}
  
function tempConvKtoC(valNum) {
    valNum = parseFloat(valNum);
    var newTempC = Math.floor(valNum-273.15);
    return newTempC;
}

function getCurrentTemp(weatherTempObject){
    var currentTemp = document.querySelector("#current-temp");
    var tempF = tempConvKtoF(weatherTempObject);
    var tempC = tempConvKtoC(weatherTempObject);
    currentTemp.textContent = tempF + "°F / " + tempC + "°C";
}

function getCurrentHumidity(weatherHumidObject){
    var currentHumid = document.querySelector("#current-humid");
    currentHumid.textContent = weatherHumidObject;
}

function getCurrentWindSpeed(weatherWindObject){
    var currentWind = document.querySelector("#current-wind");
    currentWind.textContent = weatherWindObject;
}

function getCurrentDescription(weatherDescriptionObject){
    var currentDescription = document.querySelector("#current-description")
    currentDescription.textContent = weatherDescriptionObject;
}

function getCurrentWeatherIcon(weatherIconObject){
    
    var weatherIconEl = document.createElement("img");
    weatherIconEl.classList = "img-background ml-2 mt-2";
    var weatherIconContainer = document.querySelector("#city-header");
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIconObject + "@2x.png");
    weatherIconContainer.appendChild(weatherIconEl);

}

//search city button function
//need to add in the api fetches here, some changes will be made to this later to append info
//from the api call to the city list and the city info section
function displaySearchedCity(fetchedCity){
    //prevent the submit button default action of refreshing the page
    event.preventDefault();
    
    //check button was clicked
    console.log("search button was clicked")
    
    let cityHeader = document.querySelector("#city-header");
    //remove the hide class before we append
    citylistEl.classList.remove("hide-before-append");
    cityHeader.classList.remove("hide-before-append");
    
    //get the value of the text field to place into the city span element
    let cityName = document.querySelector("#city-name").value;
    
    //create element containing city name
    let citySearchEl = document.createElement("span");
    
    //set class list for city name container
    citySearchEl.classList = "slight-margin-allaround width-100 border-bottom-user"
    
    //check we are getting it in the console
    console.log("here is the city name")
    console.log(cityName);

    //put the city name inside the cityEl span element and the city-name-header element
    updateCurrentDate();
    cityHeader.innerText = cityName;    
    citySearchEl.innerText = cityName;
    
    //prepend the cityEl into the citylistEl
    citylistEl.prepend(citySearchEl);
    clearInputField();
    getFiveDayForecastDates();
    cityApiCall(cityName);
    //updateTime.classList.remove("hide-before-append");

}

function clearInputField(){
    let inputForm = document.querySelector("#input-form");
    //console.log(text);
    inputForm[0].value = "";
    //console.log("cleared the input field")
    //console.log(inputForm[0].value);
}

//submit button event listener
buttonEl.addEventListener("click", displaySearchedCity);





