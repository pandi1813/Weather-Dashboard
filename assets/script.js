let cityHistory = [];
let searchButton = document.querySelector("#search-button");






searchButton.addEventListener("click", function(event){
    
    event.preventDefault();
    
    let city = document.querySelector("#search-input").value
    if (city !== "") {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=872873b89a0afdc97c82762a115e655a`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        console.log(firstCity.lat);
        console.log(firstCity.lon)
    
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=872873b89a0afdc97c82762a115e655a`);

    })
    
    .then(response => response.json())
    .then(data => {
        
        console.log(data)
    })

        cityHistory.push(city)

        // console.log(cityHistory)
        city = "";
        localStorage.setItem("cityList", JSON.stringify(cityHistory))
        // let storeCities = localStorage.setItem("cityName", city)
        // console.log("test " + localStorage.getItem("cityName"))

        let storedCitiesArray = JSON.parse(localStorage.getItem("cityList"));
        console.log(storedCitiesArray)
    }
})

