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

const apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?APPID=40f2f21382e4c53e0bf3d5733b6759dc&q=";

const apiFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?APPID=40f2f21382e4c53e0bf3d5733b6759dc&q=";


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
    forecastRowEl.classList.remove("hide-before-append");
    for (i = 1; i < 6; i++){
        const futureForecastDateEl = document.querySelector("#forecast-" + i + "-date")
        futureForecastDateEl.textContent = "";
        // var futureForecastDateEl = document.createElement("h6");
        futureForecastDateEl.classList = "text-light slight-margin-allaround";
        
        var startdate = moment().format("MM/DD/YYYY");
        var new_date = moment(startdate, "MM/DD/YYYY").add(i, 'days');
        var month = new_date.format('MM');
        var day = new_date.format('DD');
        var year = new_date.format('YYYY');
        var daySelectorElContainer = document.querySelector("#day-" + i + "-from-now")
        var daySelectorElDate = month + '/' + day + '/' + year
        futureForecastDateEl.textContent = daySelectorElDate;

        //checking if this works, YAY!!
        //console.log(i);
    }
}

function cityFiveDayApiCall(searchedCity){
    fetch(
        apiFiveDayUrl + searchedCity
    )
    .then(function(response){
        return response.json()
    })
    .then(function(response2){
        console.log("fetched 5 day forecast of city searched");
        console.log(response2);//get the 12pm midday hour weather indexes
        //day1 response2.list[2]
        //day2 response2.list[10]
        //day3 response2.list[18]
        //day4 response2.list[26]
        //day5 response2.list[34]
        
        //DONE
        //get day1 icon
        var day1IconId = response2.list[2].weather[0].icon;
        iconDay1El = document.querySelector("#day1-img");
        iconDay1El.setAttribute("src", "http://openweathermap.org/img/wn/" + day1IconId + "@2x.png");
        //get day2 icon
        var day2IconId = response2.list[10].weather[0].icon;
        iconDay2El = document.querySelector("#day2-img")
        iconDay2El.setAttribute("src", "http://openweathermap.org/img/wn/" + day2IconId + "@2x.png");
        //get day3 icon
        var day3IconId = response2.list[18].weather[0].icon;
        iconDay3El = document.querySelector("#day3-img")
        iconDay3El.setAttribute("src", "http://openweathermap.org/img/wn/" + day3IconId + "@2x.png");
        //get day4 icon
        var day4IconId = response2.list[26].weather[0].icon;
        iconDay4El = document.querySelector("#day4-img")
        iconDay4El.setAttribute("src", "http://openweathermap.org/img/wn/" + day4IconId + "@2x.png");
        //get day5 icon
        var day5IconId = response2.list[34].weather[0].icon;
        iconDay5El = document.querySelector("#day5-img")
        iconDay5El.setAttribute("src", "http://openweathermap.org/img/wn/" + day5IconId + "@2x.png");

        //get temp day1 CONVERT UNITS!!!
        var tempDay1 = response2.list[2].main.temp;
        //target the element we are placing in
        var tempDay1El = document.querySelector("#day-one-temp");
        //convert units
        var tempFOne = tempConvKtoF(tempDay1);
        var tempCOne = tempConvKtoC(tempDay1);
        //set textContent
        tempDay1El.textContent = tempFOne + "°F / " + tempCOne + "°C";
        //get temp day2
        var tempDay2 = response2.list[10].main.temp;
        //target the element we are placing in
        tempDay2El = document.querySelector("#day-two-temp");
         //convert units
         var tempFTwo = tempConvKtoF(tempDay2);
         var tempCTwo = tempConvKtoC(tempDay2);
         //set textContent
         tempDay2El.textContent = tempFTwo + "°F / " + tempCTwo + "°C";
        //get temp day3
        var tempDay3 = response2.list[18].main.temp;
        //target the element we are placing in
        tempDay3El = document.querySelector("#day-three-temp");
         //convert units
         var tempFThree = tempConvKtoF(tempDay3);
         var tempCThree = tempConvKtoC(tempDay3);
         //set textContent
         tempDay3El.textContent = tempFThree + "°F / " + tempCThree + "°C";
        //get temp day4
        var tempDay4 = response2.list[26].main.temp;
        //target the element we are placing in
        tempDay4El = document.querySelector("#day-four-temp");
         //convert units
         var tempFFour = tempConvKtoF(tempDay4);
         var tempCFour = tempConvKtoC(tempDay4);
         //set textContent
         tempDay4El.textContent = tempFFour + "°F / " + tempCFour + "°C";
        //get temp day5
        var tempDay5 = response2.list[34].main.temp;
        //target the element we are placing in
        tempDay5El = document.querySelector("#day-five-temp");
         //convert units
         var tempFFive = tempConvKtoF(tempDay5);
         var tempCFive = tempConvKtoC(tempDay5);
         //set textContent
         tempDay5El.textContent = tempFFive + "°F / " + tempCFive + "°C";

        //get humidity day1
        var humidDay1 = response2.list[2].main.humidity;
        //target the element we are placing in
        const humidDay1El = document.querySelector("#day-one-humid");
        //set textContent for each one
        humidDay1El.textContent = humidDay1;
        //get humidity day2
        var humidDay2 = response2.list[2].main.humidity;
        //target the element we are placing in
        const humidDay2El = document.querySelector("#day-two-humid");
        //set textContent for each one
        humidDay2El.textContent = humidDay2;
        //get humidity day3
        var humidDay3 = response2.list[2].main.humidity;
        //target the element we are placing in
        const humidDay3El = document.querySelector("#day-three-humid");
        //set textContent for each one
        humidDay3El.textContent = humidDay3;
        //get humidity day4
        var humidDay4 = response2.list[2].main.humidity;
        //target the element we are placing in
        const humidDay4El = document.querySelector("#day-four-humid");
        //set textContent for each one
        humidDay4El.textContent = humidDay4;
        //get humidity day5
        var humidDay5 = response2.list[2].main.humidity;
        //target the element we are placing in
        const humidDay5El = document.querySelector("#day-five-humid");
        //set textContent for each one
        humidDay5El.textContent = humidDay5;

        //get windspeed day1
        var windDay1 = response2.list[2].wind.speed;
        //target the element we are placing in
        const windDay1El = document.querySelector("#day-one-wind");
        //set textContent for each one
        windDay1El.textContent = windDay1;
        //get windspeed day2
        var windDay2 = response2.list[10].wind.speed;
        //target the element we are placing in
        const windDay2El = document.querySelector("#day-two-wind");
        //set textContent for each one
        windDay2El.textContent = windDay2;
        //get windspeed day3
        var windDay3 = response2.list[18].wind.speed;
        //target the element we are placing in
        const windDay3El = document.querySelector("#day-three-wind");
        //set textContent for each one
        windDay3El.textContent = windDay3;
        //get windspeed day4
        var windDay4 = response2.list[26].wind.speed;
        //target the element we are placing in
        const windDay4El = document.querySelector("#day-four-wind");
        //set textContent for each one
        windDay4El.textContent = windDay4;
        //get windspeed day5
        var windDay5 = response2.list[34].wind.speed;
        //target the element we are placing in
        const windDay5El = document.querySelector("#day-five-wind");
        //set textContent for each one
        windDay5El.textContent = windDay5;

        //get description day1
        var descDay1 = response2.list[2].weather[0].description;
        //target the element we are placing in
        const descDay1El = document.querySelector("#day-one-description");
        //set textContent for each one
        descDay1El.textContent = descDay1;
        //get description day2
        var descDay2 = response2.list[10].weather[0].description;
        //target the element we are placing in
        const descDay2El = document.querySelector("#day-two-description");
        //set textContent for each one
        descDay2El.textContent = descDay2;
        //get description day3
        var descDay3 = response2.list[18].weather[0].description;
        //target the element we are placing in
        const descDay3El = document.querySelector("#day-three-description");
        //set textContent for each one
        descDay3El.textContent = descDay3;
        //get description day4
        var descDay4 = response2.list[26].weather[0].description;
        //target the element we are placing in
        const descDay4El = document.querySelector("#day-four-description");
        //set textContent for each one
        descDay4El.textContent = descDay4;
        //get description day5
        var descDay5 = response2.list[34].weather[0].description;
        //target the element we are placing in
        const descDay5El = document.querySelector("#day-five-description");
        //set textContent for each one
        descDay5El.textContent = descDay5;
        
    });
}

function cityCurrentApiCall(searchedCity){
    fetch(
        apiCurrentUrl + searchedCity
    )
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(response2){
        console.log(response2);
        console.log("city name fetched from server");
        console.log(response2.name);

        getCurrentWeatherIcon(response2.weather[0].icon);
        getCurrentTemp(response2.main.temp);
        getCurrentHumidity(response2.main.humidity);
        getCurrentWindSpeed(response2.wind.speed);
        getCurrentDescription(response2.weather[0].description);

        
        var fetchedCityContainer = document.querySelector("#city-header");
        var fetchedCityEl = document.createElement("p");
        fetchedCityEl.classList = "city-alt";
        fetchedCityEl.textContent = "(" + response2.name + ")";
        fetchedCityContainer.appendChild(fetchedCityEl);

    });
    
}

function tempConvKtoF(valNum) {
    valNum = parseFloat(valNum);
    var newTempF = Math.floor(((valNum-273.15)*1.8)+32);
    return newTempF;
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
    cityCurrentApiCall(cityName);
    cityFiveDayApiCall(cityName);
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





