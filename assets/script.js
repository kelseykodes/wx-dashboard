var cityFormEl = document.querySelector('#city-form');
var weekAhead = document.querySelector('.week');
var cityInputEl = document.querySelector('#city');
var tempContainerEl = document.querySelector('#temp-container');
var windspeedContainerEl = document.querySelector('#windspeed-container');
var uviContainerEl = document.querySelector('#uvi-container');
var humidityContainerEl = document.querySelector('#humidity-container');
var citySearch = document.querySelector('#city-search');
var ApiKey='ac6ee46d74fff945f4929327853f7573';
// var today = moment().format("MMMM Do, YYYY, HH:mm A"); 
// $("#currentDay").text(today);

var formSubmit = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getWeatherInfo(cityname);

    tempContainerEl.textContent = "";
    cityInputEl.value = '';
  } else {
    alert('Please enter a valid city name');
  }
  if (cityname) {
    getFiveDays(cityname);
    tempContainerEl.textContent = '';
    cityInputEl.value = '';
  }
};

var btnClick = function (event) {
  // `event.target` is a reference to the DOM element of what programming language button was clicked on the page
  var weatherCity = event.target.getAttribute('submit');
  console.log('did this work?')

  if (weatherCity) {
    getFiveDays(weatherCity);

    repoContainerEl.textContent = '';
  }
};

var getWeatherInfo = function (city) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='  + city + '&appid=' + ApiKey + "&units=imperial";

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          //displayWeather(data, city);
          tempContainerEl.textContent = 'Temp: ' + data.main.temp + ' °F';
          humidityContainerEl.textContent = 'Humidity: ' + data.main.humidity + '%'
          windspeedContainerEl.textContent = 'Wind Speed: ' + data.wind.speed;
        });
      } else {
        alert('Error: ' + response.statusText); 
      }
    })
    .catch(function (error) {
      alert('Unable to connect to City');
    });
};


var getFiveDays = function (fivedays) {

  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='  + fivedays + '&appid=' + ApiKey;
  fetch(weatherUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //displayWeather(data.items, fivedays);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

//NEED TO DISPLAY 5 DAY WEATHER HERE:

// var displayWeather = function (wx, citySearching) {
//  for (var i = 0; i<weekAhead.length;i++) {
//     repoContainerEl.textContent = 'No Weather Information Found';
//     return;
//   }
//   citySearch.textContent = citySearching;
// };

cityFormEl.addEventListener('submit', formSubmit);