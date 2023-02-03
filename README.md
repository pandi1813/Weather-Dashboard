# Weather Dashboard
 Check out the live app [here](https://pandi1813.github.io/Weather-Dashboard/)
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)



## Overview

### The challenge

To create an app that uses Open Weather api to display selected city's current weather details and 5 day forecast. After user searches for a city it is saved as search history in the local storage and displays a button for each city in the search history. When the buttons are clicked the city's weather is displayed as before.

### Screenshot

![](./assets/images/Screenshot%202023-02-03%20183841.png)





## My process

I created  a pseudocode to identify the major steps.
First I created fetch requests to get current weather details for a selected city and displayed it in the browser. Then used local storage to save search history and displayed it as buttons that would display current weather when clicked. Finally created cards to display 5 day weather forecast and displayed their dates using moment.js.

### Built with

- Vanilla JS
- strings, numbers, arrays, objects and the combination of them as data types
- functions
- event listeners
- DOM



### What I learned

- How to link into html elements using the DOM API and how to modify them.
- How to use event listeners to create responsive pages
- HOw to use local storage to save and display search history




```js
   fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=872873b89a0afdc97c82762a115e655a`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        // console.log(firstCity.lat);
        // console.log(firstCity.lon)
        console.log(citiesFound)
        //using the geo details fetch the weather forecast 
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=metric&appid=872873b89a0afdc97c82762a115e655a`);
        
    })
    
    .then(response => response.json())
    .then(data => {
;
```

```js
function currentWeather(name, icon, temperature, wind, humidity) {
    // console.log(today)
    currentWeatherSection.innerHTML = 
   `<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class= "display-4">${name}</h1>
      <h2 class="display-5">${currentDate}<img src = https://openweathermap.org/img/wn/${icon}@2x.png ></h2>
      <p>Temperature: ${temperature} °C</p>
      <p>Wind: ${wind} KPH</p>
      <p>Humidity: ${humidity}%</p>
    </div>
  </div>`
}
```



### Continued development
I would try to simplify my code as much as possible and add a bit of advanced styling to the app




## Author
  Andrea Peter

- GitHub - [pandi1813](https://github.com/pandi1813)



