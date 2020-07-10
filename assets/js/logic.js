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

//submit button function
function displaySearchedCity(){
    event.preventDefault();
    //check button was clicked
    console.log("search button was clicked")
    //remove the hide class before we append
    citylistEl.classList.remove("hide-before-append");
    //get the value of the text field to place into the city span element
    let cityName = document.querySelector("#city-name").value;
    cityName.value = "";
    //create element containing city name
    let cityEl = document.createElement("span");
    //set class list for city name container
    cityEl.classList = "slight-margin-allaround width-100 border-bottom-user"
    //check we are getting it in the console
    console.log("here is the city name")
    console.log(cityName);
}

//submit button event listener
buttonEl.addEventListener("click", displaySearchedCity);





