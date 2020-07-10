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
const formInputTextArea = document.querySelector("#city-name");
//  button element
const buttonEl = document.querySelector("#search-button");
//select the city list element we are prepending the city name to
const citylistEl = document.querySelector("#city-list");

//select element that will display current date 
const currentDateEl = document.querySelector("#current-date")

//moment variables and objects
var nowDate = moment().format('MM/DD/YYYY');
//display current time in that city??


//search city button function
//need to add in the api fetches here, some changes will be made to this later to append info
//from the api call to the city list and the city info section
function displaySearchedCity(){
    //prevent the submit button default action of refreshing the page
    event.preventDefault();
    
    //check button was clicked
    console.log("search button was clicked")
    
    //remove the hide class before we append
    citylistEl.classList.remove("hide-before-append");
    
    //get the value of the text field to place into the city span element
    let cityName = document.querySelector("#city-name").value;
    
    
    //create element containing city name
    let cityEl = document.createElement("span");
    
    //set class list for city name container
    cityEl.classList = "slight-margin-allaround width-100 border-bottom-user"
    
    //check we are getting it in the console
    console.log("here is the city name")
    console.log(cityName);

    //put the city name inside the cityEl span element
    cityEl.innerText = cityName;
    
    //prepend the cityEl into the citylistEl
    citylistEl.prepend(cityEl);
    clearInputField(cityName);
}

function clearInputField(text){
    let inputForm = document.querySelector("#input-form");
    //console.log(text);
    inputForm[0].value = "";
    //console.log("cleared the input field")
    //console.log(inputForm[0].value);
}

//submit button event listener
buttonEl.addEventListener("click", displaySearchedCity);





