let searchButton = document.querySelector("#search-button");
let cityInput;
let searchHistory = document.querySelector("#history")
let cityHistory = JSON.parse(localStorage.getItem("cityList")) || [];
let currentWeatherSection = document.querySelector("#today")
let currentDate =moment().format("Do MMMM YYYY")
let forecastSection = document.querySelector("#forecast")


displaySearchHistory();         // displays buttons for each city saved in local storage as a search history


// ***************** EVENT LISTENERS ************************


searchButton.addEventListener("click", function(event){
    
    event.preventDefault();
    
    cityInput = document.querySelector("#search-input").value
    if (cityInput !== "") {
        //if there city input is not empty
        getWeatherInfo(cityInput);        //fetch weather info
        saveCityHistory();       //save searched city in the local storage
        displaySearchHistory();  // updates search history buttons
        document.querySelector('#search-input').value = ""
    }    
 
})    




searchHistory.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        
        getWeatherInfo(event.target.innerHTML);
        displayForecast();
    }    
})    

// clear search history
let clearBtn = document.querySelector('#clear')

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    cityHistory = [];
    
    searchHistory.innerHTML = ""
})


//*******************  FUNCTIONS  ***************************

// fetch weather data

function getWeatherInfo(city) {
    
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=872873b89a0afdc97c82762a115e655a`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        // console.log(firstCity.lat);
        // console.log(firstCity.lon)
        // console.log(citiesFound)
        //using the geo details fetch the weather forecast 
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=metric&appid=872873b89a0afdc97c82762a115e655a`);
        
    })    
    .then(response => response.json())
    .then(data => {
        
        
        // create variables for weather data that can then be passed as parameters
        let cityDetails = data.list[0];
        let cityName = data.city.name;
        let weatherIcon = cityDetails.weather[0].icon;
        let weatherTemperature = cityDetails.main.temp;
        let weatherHumidity = cityDetails.main.humidity;
        let weatherWindSpeed = cityDetails.wind.speed;
        let mainWeather = cityDetails.weather[0].main
        console.log(data)
        console.log(mainWeather)
        currentWeather(cityName, weatherIcon, weatherTemperature, weatherWindSpeed, weatherHumidity)
        forecastSection.innerHTML = "";
        setBackground(mainWeather)


        for (let i = 1; i < 6; i++) { // want to create 1 card for each day in the forecast section
           let cityForecast = data.list[i]; 
           let forecastIcon = cityForecast.weather[0].icon;
           let forecastTemp = cityForecast.main.temp;
           let forecastWind = cityForecast.wind.speed;
           let forecastHumidity = cityForecast.main.humidity;
            


           displayForecast(i, forecastIcon, forecastTemp, forecastWind, forecastHumidity)
        }   

    });    
}    



//save search history in local storage
function saveCityHistory() {
    
    
    cityHistory.push(cityInput)
    // console.log("test " + cityHistory)
        localStorage.setItem("cityList", JSON.stringify(cityHistory));
        // console.log("list: "+ localStorage.getItem("cityList"))
        
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


// currentWeather()
function currentWeather(name, icon, temperature, wind, humidity) {
    // console.log(today)
    currentWeatherSection.innerHTML = 
   `<div id="jumbotron" class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class= "display-4">${name}</h1>
      <h2 class="display-5">${currentDate}</h2>
      <p>Temperature: ${temperature} °C</p>
      <p>Wind: ${wind} KPH</p>
      <p>Humidity: ${humidity}%</p>
    </div>
  </div>`
}

//set jumbotron background
function setBackground(weather) {
    let jumbotron = document.querySelector('#jumbotron');
    if (weather === "Clouds") {
        console.log(jumbotron)
        jumbotron.style.backgroundImage = 'url(./assets/images/clouds.jpg)'
    } else if (weather === "Clear") {
        jumbotron.style.backgroundImage = 'url(./assets/images/clear.jpg)'
    } else if (weather === "Rain") {
        jumbotron.style.backgroundImage = 'url(./assets/images/rain.png)'
        
    }else if (weather === "Thunderstorm") {
        jumbotron.style.backgroundImage = 'url(./assets/images/thunder.jpg)'
        
    }else if (weather === "Snow") {
        jumbotron.style.backgroundImage = 'url(./assets/images/snow.jpg)'
        
    }else if (weather === "Drizzle") {
        jumbotron.style.backgroundImage = 'url(./assets/images/drizzle.jpg)'
        
    } else if (weather === "Atmosphere") {
        jumbotron.style.backgroundImage = 'url(./assets/images/fog.jpg)'
        
    }
}

// display cards for weather forecast

function displayForecast(index, icon, temp, wind, humidity) {

    // console.log("test " + index);
    let forecastCard = document.createElement("div");
    let futureDates = moment().add(index, 'days').format("D-MMM-YYYY");
    forecastCard.innerHTML =
     `<div class="card ${index} mx-3 mt-2" style="width: 18rem;">
        <div class="card-body">
             <h5>${futureDates}</h5>
             <img alt="weather icon" src ="https://openweathermap.org/img/wn/${icon}@2x.png">
             <p class="card-text">Temperature: ${temp}°C</p>
             <p class="card-text">Wind Speed: ${wind}KPH</p>
             <p class="card-text">Humidity: ${humidity}%</p>
        </div>
      </div>`;
    forecastSection.append(forecastCard);
}

console.log(moment().add(1, 'days').format("D-MMM-YYYY"))