var cityFormEl = document.querySelector('#city-form');
var weekAhead = document.querySelector('.week');
var cityInputEl = document.querySelector('#city');
var tempContainerEl = document.querySelector('#temp-container');
var windspeedContainerEl = document.querySelector('#windspeed-container');
var uviContainerEl = document.querySelector('#uvi-container');
var humidityContainerEl = document.querySelector('#humidity-container');
var citySearch = document.querySelector('#city-search');
var btn = document.querySelector('.btn');
var selectCity= document.querySelector('.select-city')
var ApiKey='ac6ee46d74fff945f4929327853f7573';
var today = moment().format("MMMM Do, YYYY, hh:mm A"); 
$("#currentDay").text(today);


var formSubmit = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getWeatherInfo(cityname);
    citySearch.textContent = cityname;
    tempContainerEl.textContent = "";
    cityInputEl.value = '';
    appendButton(cityname);
  } else {
    alert('Please enter a valid city name');
  }
  // if (cityname) {
  //   getFiveDays(cityname);
  //   tempContainerEl.textContent = '';
  //   cityInputEl.value = '';
  // }
};

var btnClick = function (event) {
  var weatherCity = event.target.getAttribute('submit');
  console.log('did this work?')

  if (weatherCity) {
    getFiveDays(weatherCity);
  }
};

var getWeatherInfo = function (city) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='  + city + '&appid=' + ApiKey + '&units=imperial';

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
      
  .then(function (data) {
    //uvi stuff here
          console.log(data);
          //displayWeather(data, city);
          tempContainerEl.textContent = 'Temp: ' + data.main.temp + ' °F';
          humidityContainerEl.textContent = 'Humidity: ' + data.main.humidity + '%'
          windspeedContainerEl.textContent = 'Wind Speed: ' + data.wind.speed + ' mph';
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          getFiveDays(lat,lon,city);
        });
};


var getFiveDays = function (lat,lon,city) {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +  '&lon=' + lon + '&appid=' + ApiKey + '&units=imperial';
  fetch(weatherUrl)
  .then(function (response) {
    return  response.json() 
  })
  .then(function (data) {
     displayWeather(data, city);
  });
};

//NEED TO DISPLAY 5 DAY WEATHER HERE:
var fiveDayTemp = document.querySelectorAll('.temp');
var fiveDayWind = document.querySelectorAll('.wind');
var fiveDayHumidity = document.querySelectorAll('.humidity');

var displayWeather = function (data, city) {
 for (var i = 0; i < 5;i++) {
   fiveDayTemp[i].textContent= ' ' + data.daily[i].temp.day;
   fiveDayWind[i].textContent= ' ' + data.daily[i].wind_speed + "mph";
   fiveDayHumidity[i].textContent= ' ' + data.daily[i].humidity;
  }
  console.log(city);
  //see what city is being searched
};

cityFormEl.addEventListener('submit', formSubmit);


//APPENDING BUTTON
var searchHistory = document.createElement('button');
var historyBtn = document.getElementById('search-history');
//historyBtn.textContent = citySearch;
console.log(historyBtn);

//historyBtn.append(button)

//build button up and add event listener to it
//historyBtn.addEventListener('click', )






























// var appendButton = function (city) {
    
//   //append button
//   var cityButton = $('.btn').attr({
//       type: 'submit',
//       class: 'side-button',
//       value: city,
//   });

//   console.log(cityButton)

//  $(".selecet-city").append(cityButton);

//   //change value of storedCity and save it to local storage
//   storedCity=city;
//   localStorage.setItem('storedCity',storedCity);
// }

//create element
// within element assign text context
//get elemetbyid for elem
//appendChild
//btn.appendChild
