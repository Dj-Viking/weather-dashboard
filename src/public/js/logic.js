//DONE GIVEN a weather dashboard with form inputs
//DONE WHEN I search for a city
//DONE THEN I am presented with current and future conditions for that city and that city is added to the search history
//DONE WHEN I view current weather conditions for that city
//DONE THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//DONE WHEN I view the UV index
//DONE THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//DONE WHEN I view future weather conditions for that city
//DONE THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//DONE WHEN I click on a city in the search history
//DONE  **making the <button> tag have the on click function inside to invoke the api call again just like the search
//DONE THEN I am again presented with current and future conditions for that city

//DONE  have the forecast unhide after selecting the city and updating to the document

//DONE HOW TO MAKE TEXT FIELD NOT REFRESH PAGE WHEN I HIT ENTER AFTER TYPING IN A CITY NAME
//DONE SO THAT THE TEXT FIELD CAN ACT LIKE A SUBMIT BUTTON TOO??
//????? HOW TO TRACK HOW MANY API CALLS I HAVE DONE AND STORE INTO STORAGE MAYBE??
//????? HOW TO HIDE API KEY AND STILL USE THE APP NORMALLY??
//????? repeat searches just go to the top of the history
//????? if city could not be found dont prepend to the history
//????? how to display local time of the searched city??



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

// var imported = document.createElement('script');
// imported.src = './assets/js/config.js';
// document.head.appendChild(imported);

// const WEATHER_KEY = config.WEATHER_KEY;
// const WEATHER_KEY = window.prompt("Notice: Until a partial backend solution is found for this application- Please enter your personal Open Weather API-key to use this app.\n\nPress OK after you have entered in your key and enjoy the app! ");
const apiCurrentUrl =
// `http://localhost:4000/current?q=`;
`https://weather-nomad.herokuapp.com/current?q=`;
/*`https://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_KEY}&q=`;*/

const apiFiveDayUrl = 
// `http://localhost:4000/fiveday?q=`
`https://weather-nomad.herokuapp.com/fiveday?q=`
 /*`https://api.openweathermap.org/data/2.5/forecast?APPID=${WEATHER_KEY}&q=`;*/


//const apiUVIndexUrl = "https://api.openweathermap.org/data/2.5/uvi?APPID=${WEATHER_KEY}&lat=&lon=";

const apiFiveDayUVIndexUrl = 
// `http://localhost:4000/uvindex?lat=`;
`https://weather-nomad.herokuapp.com/uvindex?lat=`;

/* `https://api.openweathermap.org/data/2.5/uvi?lat=`;*/

//initializing a city array for use with local storage
let cityArray = []

//make saveCity function
function saveCity(cityName){
    //save everytime user searches a city
    //so place this function where
    //place the cityname passed in, to the array that we are storing
    cityArray.push(cityName);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
}
//push the city string name into a temparray that gets pushed into localStorage
//have to check notes again for the storage...

//make loadCity function
//on the clicked <a> element that has the city name inside execute load city
loadCity();
function loadCity(){
    cityArray = JSON.parse(localStorage.getItem("cityArray"));
    if (!cityArray || cityArray === null){
        cityArray = []
    }
    citylistEl.classList.remove("hide-before-append");
    for (let i = 0; i < cityArray.length; i++){
        //create the element to store the value of the index we are iterating through
        const cityNameEl = document.createElement("span");
        //add the classes that we want to the element
        cityNameEl.classList = "slight-margin-allaround width-100 border-bottom-user";
        //assign the value of new element with the text of the array index
        cityNameEl.textContent = cityArray[i];
        //create an <button> element we want to append the city name span to
        const cityNameButtonEl = document.createElement("button");
        cityNameButtonEl.classList = "slight-margin-allaround width-100 button-search-name"
        cityNameButtonEl.setAttribute("type", "submit");
        //prepend the citynamebuttonEl into the citylistEl
        citylistEl.prepend(cityNameButtonEl);
        //append the span into the button
        cityNameButtonEl.appendChild(cityNameEl);
        cityNameButtonEl.addEventListener("click", function(event){
            formInputTextAreaEl.value = cityArray[i];
            displaySearchedCityFromButton(formInputTextAreaEl.value);
        });
    }
}

function displaySearchedCityFromButton(cityName){
    event.preventDefault();
    const cityHeader = document.querySelector("#city-header");
    citylistEl.classList.remove("hide-before-append");
    cityHeader.classList.remove("hide-before-append");
    updateCurrentDate();
    cityHeader.innerText = cityName;
    clearInputField();
    cityCurrentApiCall(cityName);
    cityFiveDayApiCall(cityName);
    getFiveDayForecastDates();

}
//check if the array in localStorage is null or falsey set it to empty array
//else make for loop for each string inside the storage array
//place each string inside the element that will prepend into the city-list element





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
        futureForecastDateEl.classList = "text-light slight-margin-allaround";
        
        var startdate = moment().format("MM/DD/YYYY");
        var new_date = moment(startdate, "MM/DD/YYYY").add(i, 'days');
        var month = new_date.format('MM');
        var day = new_date.format('DD');
        var year = new_date.format('YYYY');
        var daySelectorElDate = month + '/' + day + '/' + year
        futureForecastDateEl.textContent = daySelectorElDate;

        //checking if this works, YAY!!
    }
}

//place this function inside the main city search api call
//and get the lat lon from that data
function cityCurrentUVIndexApiCall(lat, lon){
    fetch(
        apiFiveDayUVIndexUrl + lat
         + "&lon=" + lon
    )
    .then(function(response){
        return response.json();
    })
    .then(function({ data }){
        //get the UV index number
        let currentUVnum = data.value;

        //select element to put the text in
        const currentUVnumEl = document.querySelector("#day-current-UV");
        //set the text in the element
        currentUVnumEl.textContent = currentUVnum;
        //if statement determining the index value to change the color of the background of the text
        //and change the text color to match the background color to the UV index standard 
        if (currentUVnum === 0 || currentUVnum < 1)
        {
            currentUVnumEl.classList = 'low';
        } 
        else if (currentUVnum >= 1 && currentUVnum <= 2)
        {
            currentUVnumEl.classList = 'low';
        } 
        else if(currentUVnum >= 3 && currentUVnum <= 5)
        {
            currentUVnumEl.classList = "moderate";
        } 
        else if (currentUVnum >=5 && currentUVnum < 6)
        {
            currentUVnumEl.classList = "moderate";
        } 
        else if(currentUVnum >= 6 && currentUVnum <= 7) 
        {
            currentUVnumEl.classList = "high";
        } 
        else if (currentUVnum >= 7 && currentUVnum < 8)
        {
            currentUVnumEl.classList = "high";
        } 
        else if (currentUVnum >= 8 && currentUVnum <= 9)
        {
            currentUVnumEl.classList = "very-high";
        } 
        else if(currentUVnum >= 8 && currentUVnum <= 10) 
        {
            currentUVnumEl.classList = "very-high";
        } 
        else if (currentUVnum > 10 && currentUVnum <= 11)
        {
            currentUVnumEl.classList = "very-high";
        } 
        else if(currentUVnum > 11) 
        {
            currentUVnumEl.classList = "extreme";
        }
    });
}
//not placing the UV index into the 5 day forecast just yet
//place this inside the main five day forecast function  
//
// function cityFiveDayUVIndexApiCall(lat, lon){
//     fetch(
//         `https://api.openweathermap.org/data/2.5/uvi?APPID=${WEATHER_KEY}&lat=` + lat
//          + "&lon=" + lon
//     )
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){

    //     //for loop to iterate through each date based on the 12pm index value
    //     for (let i = 1; i < 6; i++){
    //         //get the value of the UV index from the response
    //        // var uvDayNum = data.
    //         //select element we are putting the text inside
    //         var uvDayEl = document.querySelector("#day-" + i + "UV");

    //     }
    //     //day1 UV Index

    //     //day2 UV Index
        
    //     //day3 UV Index
        
    //     //day4 UV Index
        
    //     //day5 UV Index
    // });
// }


// TODO: set this up with a loop that can increment the iterator
// such that I dont have to repeat everything so many times
function cityFiveDayApiCall(searchedCity){
    fetch(
        apiFiveDayUrl + searchedCity
    )
    .then(function(response){
        return response.json();
    })
    .then(function({ data }){
        //day1 data.list[6]
        //day2 data.list[14]
        //day3 data.list[22]
        //day4 data.list[30]
        //day5 data.list[38]
        
        //DONE
        //get day1 icon
        const day1IconId = data.list[6].weather[0].icon;
        iconDay1El = document.querySelector("#day1-img");
        iconDay1El.setAttribute("src", "https://openweathermap.org/img/wn/" + day1IconId + "@2x.png");
        
        //get day2 icon
        const day2IconId = data.list[14].weather[0].icon;
        iconDay2El = document.querySelector("#day2-img")
        iconDay2El.setAttribute("src", "https://openweathermap.org/img/wn/" + day2IconId + "@2x.png");
        
        //get day3 icon
        const day3IconId = data.list[22].weather[0].icon;
        iconDay3El = document.querySelector("#day3-img")
        iconDay3El.setAttribute("src", "https://openweathermap.org/img/wn/" + day3IconId + "@2x.png");
        
        //get day4 icon
        const day4IconId = data.list[30].weather[0].icon;
        iconDay4El = document.querySelector("#day4-img")
        iconDay4El.setAttribute("src", "https://openweathermap.org/img/wn/" + day4IconId + "@2x.png");
        
        //get day5 icon
        const day5IconId = data.list[38].weather[0].icon;
        iconDay5El = document.querySelector("#day5-img")
        iconDay5El.setAttribute("src", "https://openweathermap.org/img/wn/" + day5IconId + "@2x.png");
        
        //get temp day1 CONVERT UNITS!!!
        const tempDay1 = data.list[6].main.temp;
        //target the element we are placing in
        const tempDay1El = document.querySelector("#day-one-temp");
        //convert units
        const tempFOne = tempConvKtoF(tempDay1);
        const tempCOne = tempConvKtoC(tempDay1);
        //set textContent
        tempDay1El.textContent = tempFOne + "°F / " + tempCOne + "°C";

        //get temp day2
        const tempDay2 = data.list[14].main.temp;
        //target the element we are placing in
        tempDay2El = document.querySelector("#day-two-temp");
         //convert units
         const tempFTwo = tempConvKtoF(tempDay2);
         const tempCTwo = tempConvKtoC(tempDay2);
         //set textContent
         tempDay2El.textContent = tempFTwo + "°F / " + tempCTwo + "°C";

        //get temp day3
        const tempDay3 = data.list[22].main.temp;
        //target the element we are placing in
        tempDay3El = document.querySelector("#day-three-temp");
         //convert units
         const tempFThree = tempConvKtoF(tempDay3);
         const tempCThree = tempConvKtoC(tempDay3);
         //set textContent
         tempDay3El.textContent = tempFThree + "°F / " + tempCThree + "°C";

        //get temp day4
        const tempDay4 = data.list[30].main.temp;
        //target the element we are placing in
        tempDay4El = document.querySelector("#day-four-temp");
         //convert units
         const tempFFour = tempConvKtoF(tempDay4);
         const tempCFour = tempConvKtoC(tempDay4);
         //set textContent
         tempDay4El.textContent = tempFFour + "°F / " + tempCFour + "°C";

        //get temp day5
        const tempDay5 = data.list[38].main.temp;
        //target the element we are placing in
        tempDay5El = document.querySelector("#day-five-temp");
         //convert units
         const tempFFive = tempConvKtoF(tempDay5);
         const tempCFive = tempConvKtoC(tempDay5);
         //set textContent
         tempDay5El.textContent = tempFFive + "°F / " + tempCFive + "°C";

        //get humidity day1
        const humidDay1 = data.list[6].main.humidity;
        //target the element we are placing in
        const humidDay1El = document.querySelector("#day-one-humid");
        //set textContent for each one
        humidDay1El.textContent = humidDay1;

        //get humidity day2
        const humidDay2 = data.list[14].main.humidity;
        //target the element we are placing in
        const humidDay2El = document.querySelector("#day-two-humid");
        //set textContent for each one
        humidDay2El.textContent = humidDay2;

        //get humidity day3
        const humidDay3 = data.list[22].main.humidity;
        //target the element we are placing in
        const humidDay3El = document.querySelector("#day-three-humid");
        //set textContent for each one
        humidDay3El.textContent = humidDay3;

        //get humidity day4
        const humidDay4 = data.list[30].main.humidity;
        //target the element we are placing in
        const humidDay4El = document.querySelector("#day-four-humid");
        //set textContent for each one
        humidDay4El.textContent = humidDay4;

        //get humidity day5
        const humidDay5 = data.list[38].main.humidity;
        //target the element we are placing in
        const humidDay5El = document.querySelector("#day-five-humid");
        //set textContent for each one
        humidDay5El.textContent = humidDay5;

        //get windspeed day1
        const windDay1 = data.list[6].wind.speed;
        //target the element we are placing in
        const windDay1El = document.querySelector("#day-one-wind");
        //set textContent for each one
        windDay1El.textContent = windDay1 + " mph";

        //get windspeed day2
        const windDay2 = data.list[14].wind.speed;
        //target the element we are placing in
        const windDay2El = document.querySelector("#day-two-wind");
        //set textContent for each one
        windDay2El.textContent = windDay2 + " mph";

        //get windspeed day3
        const windDay3 = data.list[22].wind.speed;
        //target the element we are placing in
        const windDay3El = document.querySelector("#day-three-wind");
        //set textContent for each one
        windDay3El.textContent = windDay3 + " mph";

        //get windspeed day4
        const windDay4 = data.list[30].wind.speed;
        //target the element we are placing in
        const windDay4El = document.querySelector("#day-four-wind");
        //set textContent for each one
        windDay4El.textContent = windDay4 + " mph";

        //get windspeed day5
        const windDay5 = data.list[38].wind.speed;
        //target the element we are placing in
        const windDay5El = document.querySelector("#day-five-wind");
        //set textContent for each one
        windDay5El.textContent = windDay5 + " mph";

        //get description day1
        const descDay1 = data.list[6].weather[0].description;
        //target the element we are placing in
        const descDay1El = document.querySelector("#day-one-description");
        //set textContent for each one
        descDay1El.textContent = descDay1;

        //get description day2
        const descDay2 = data.list[14].weather[0].description;
        //target the element we are placing in
        const descDay2El = document.querySelector("#day-two-description");
        //set textContent for each one
        descDay2El.textContent = descDay2;

        //get description day3
        const descDay3 = data.list[22].weather[0].description;
        //target the element we are placing in
        const descDay3El = document.querySelector("#day-three-description");
        //set textContent for each one
        descDay3El.textContent = descDay3;
        
        //get description day4
        const descDay4 = data.list[30].weather[0].description;
        //target the element we are placing in
        const descDay4El = document.querySelector("#day-four-description");
        //set textContent for each one
        descDay4El.textContent = descDay4;

        //get description day5
        const descDay5 = data.list[38].weather[0].description;
        //target the element we are placing in
        const descDay5El = document.querySelector("#day-five-description");
        //set textContent for each one
        descDay5El.textContent = descDay5;
    });
}

//add catch for when a city name could not be found, send a message to user and return
//check if searched city is null and alert user no city name was entered
function cityCurrentApiCall(searchedCity){
    fetch(
        apiCurrentUrl + searchedCity
        )
        .then(function(response){
            if(response.ok){
                response.json()
                .then(function({ data }){
                    
                    getCurrentWeatherIcon(data.weather[0].icon);
                    getCurrentTemp(data.main.temp);
                    getCurrentHumidity(data.main.humidity);
                    getCurrentWindSpeed(data.wind.speed);
                    getCurrentDescription(data.weather[0].description);
                    
                    //get the lat and lon values from the response place as arguments for this function
                    //let lat = data.coord.lat;
                    //let lon = data.coord.lon;
                    cityCurrentUVIndexApiCall(data.coord.lat, data.coord.lon);
                
                    const fetchedCityContainer = document.querySelector("#city-header");
                    //change this element to an <a> anchor element
                    //set the function inside the HTML on click execute displaySearchedCity
                    var fetchedCityEl = document.createElement("p");
                    fetchedCityEl.classList = "city-alt";
                    fetchedCityEl.textContent = "(" + data.name + ", " + data.sys.country + ")";
                    fetchedCityContainer.appendChild(fetchedCityEl);
                });
            } else {
                window.alert("We could not find that city: " + response.statusText);
            }
        })
    .catch(
        err => alert("Possible network error occurred. " + err)
    );
    
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
    currentWind.textContent = weatherWindObject + " mph";
}

function getCurrentDescription(weatherDescriptionObject){
    var currentDescription = document.querySelector("#current-description")
    currentDescription.textContent = weatherDescriptionObject;
}

function getCurrentWeatherIcon(weatherIconObject){
    
    var weatherIconEl = document.createElement("img");
    weatherIconEl.classList = "img-background ml-2 mt-2";
    var weatherIconContainer = document.querySelector("#city-header");
    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIconObject + "@2x.png");
    weatherIconContainer.appendChild(weatherIconEl);

}

//search city button function and past city searches function
//DONE need to add in the api fetches here, some changes will be made to this later to append info
//DONE  *from the api call to the city list and the city info section

function displaySearchedCity(){


    //prevent the submit button default action of refreshing the page
    event.preventDefault();
    
    //check button was clicked
    
    const cityHeader = document.querySelector("#city-header");
    //remove the hide class before we append
    //get the value of the text field to place into the city span element
    const cityName = document.querySelector("#city-name").value;
    //check if the value was falsey or null return out of function
    //  **alert user that no city name was entered
    if (!cityName){
        window.alert("no city name was entered!")
        return;
    }
    citylistEl.classList.remove("hide-before-append");
    cityHeader.classList.remove("hide-before-append");

    //create element containing city name
    const citySearchEl = document.createElement("span");
    //create button element to append the span to
    const citySearchedButtonEl = document.createElement("button");
    citySearchedButtonEl.classList = "slight-margin-allaround width-100 button-search-name";
    citySearchedButtonEl.setAttribute("type", "submit");
    citySearchedButtonEl.appendChild(citySearchEl);
    
    //set class list for city name container
    citySearchEl.classList = "slight-margin-allaround width-100 border-bottom-user"
    
    //check we are getting it in the console

    //put the city name inside the cityEl span element and the city-name-header element
    updateCurrentDate();
    cityHeader.innerText = cityName;    
    citySearchEl.innerText = cityName;
    
    //prepend the cityEl into the citylistEl
    citylistEl.prepend(citySearchedButtonEl);
    citySearchedButtonEl.addEventListener("click", function(event){
        formInputTextAreaEl.value = cityName;
        displaySearchedCityFromButton(formInputTextAreaEl.value);
    });
    clearInputField();
    getFiveDayForecastDates();
    cityCurrentApiCall(cityName);
    cityFiveDayApiCall(cityName);
    //updateTime.classList.remove("hide-before-append");
    saveCity(cityName);

}

function clearInputField(){
    let inputForm = document.querySelector("#input-form");
    inputForm[0].value = "";
}

//submit button event listener
buttonEl.addEventListener("click", displaySearchedCity);

const inputFormEl = document.querySelector("#input-form");
//fixing the submit default of the input form which refreshes the page
//after hitting enter, preventDefault fixes this
inputFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    displaySearchedCity();
});