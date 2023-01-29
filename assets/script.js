let searchButton = document.querySelector("#search-button");
let cityInput;
let searchHistory = document.querySelector("#history")

let cityHistory = JSON.parse(localStorage.getItem("cityList")) || [];


// displaySearchHistory(JSON.parse(localStorage.getItem("cityList"))[0])
displaySearchHistory();
searchButton.addEventListener("click", function(event){
    
    event.preventDefault();
    
    cityInput = document.querySelector("#search-input").value
    if (cityInput !== "") {
        //if there city input is not empty, fetch the geo details for the requested city
        
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=872873b89a0afdc97c82762a115e655a`)
        .then(response => response.json())
        .then(citiesFound => {
            let firstCity = citiesFound[0];
            console.log(firstCity.lat);
            console.log(firstCity.lon)
            
            //using the geo details fetch the weather forecast 
            return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=872873b89a0afdc97c82762a115e655a`);
            
        })
        
        .then(response => response.json())
        .then(data => {
            
            console.log(data)
        });
        
        saveCityHistory();
        displaySearchHistory();
    }
})



//*******************  FUNCTIONS  ***************************

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
        console.log(cityHistoryElement)

        let searchHistoryButton = document.createElement("div");
        searchHistoryButton.innerHTML = `<button type="button" class="btn btn-secondary btn-lg">${cityHistoryElement}</button>`; 
        searchHistory.prepend(searchHistoryButton);
    }
    




    // let historyButton = document.createElement("button");
    // historyButton.innerHTML = cityName;
    // searchHistory.prepend(historyButton)
}
