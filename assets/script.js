let searchButton = document.querySelector("#search-button");
let cityInput;
let searchHistory = document.querySelector("#history")
let cityHistory = JSON.parse(localStorage.getItem("cityList")) || [];
let currentWeatherSection = document.querySelector("#today")
let currentDate =moment().format("Do MMMM YYYY")


displaySearchHistory();         // displays buttons for each city saved in local storage as a search history


// ***************** EVENT LISTENERS ************************


searchButton.addEventListener("click", function(event){
    
    event.preventDefault();
    // console.log(event)
    cityInput = document.querySelector("#search-input").value
    if (cityInput !== "") {
        //if there city input is not empty
        getWeatherInfo();        //fetch weather info
        saveCityHistory();       //save searched city in the local storage
        displaySearchHistory();  // updates search history buttons
    }
})




searchHistory.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        console.log("button test")
    }
})


//*******************  FUNCTIONS  ***************************
// fetch weather data

function getWeatherInfo() {
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=872873b89a0afdc97c82762a115e655a`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        // console.log(firstCity.lat);
        // console.log(firstCity.lon)
        
        //using the geo details fetch the weather forecast 
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=metric&appid=872873b89a0afdc97c82762a115e655a`);
        
    })
    
    .then(response => response.json())
    .then(data => {
        // console.log(data.list[0])

        // create variables for weather data that can then be passed as parameters
        let cityDetails = data.list[0];
        let cityName = data.city.name;
        let weatherIcon = cityDetails.weather[0].icon;
        let weatherTemperature = cityDetails.main.temp;
        let weatherHumidity = cityDetails.main.humidity;
        let weatherWindSpeed = cityDetails.wind.speed;

        console.log("temperature: "+cityDetails.main.temp)
        currentWeather(cityName, weatherIcon, weatherTemperature, weatherWindSpeed, weatherHumidity)
    });
}



//save search history in local storage
function saveCityHistory() {
    
        
        cityHistory.push(cityInput)
        console.log("test " + cityHistory)
        localStorage.setItem("cityList", JSON.stringify(cityHistory));
        console.log("list: "+ localStorage.getItem("cityList"))
    
}

//display buttons for search history

function displaySearchHistory () {
    searchHistory.innerHTML = "";

    for (let i = 0; i < cityHistory.length; i++) {
        const cityHistoryElement = cityHistory[i];
        // console.log(cityHistoryElement)

        let searchHistoryButtonDiv = document.createElement("div");
        searchHistoryButtonDiv.innerHTML = `<button type="button" class="btn btn-secondary btn-lg">${cityHistoryElement}</button>`; 
        searchHistory.prepend(searchHistoryButtonDiv);
    }   
};


// display current weather
// console.log(currentDate)

// currentWeather()
function currentWeather(name, icon, temperature, wind, humidity) {
    // console.log(today)
    currentWeatherSection.innerHTML = `<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class= "display-4">${name}</h1>
      <h2 class="display-5">${currentDate}<img src = http://openweathermap.org/img/wn/${icon}@2x.png ></h2>
      <p>Temperature: ${temperature} </p>
      <p>Wind: ${wind}</p>
      <p>Humidity ${humidity}</p>
    </div>
  </div>`
}


