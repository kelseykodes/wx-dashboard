var cityFormEl = document.querySelector('#city-form');
// var languageButtonsEl = document.querySelector('#language-buttons');
var cityInputEl = document.querySelector('#city');
var tempContainerEl = document.querySelector('#temp-container');
var citySearch = document.querySelector('#city-search');
var ApiKey='ac6ee46d74fff945f4929327853f7573';

var formSubmit = function (event) {
  event.preventDefault();

  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getWeatherInfo(cityname);

    tempContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a valid city name');
  }
};

// var btnClick = function (event) {
//   // `event.target` is a reference to the DOM element of what programming language button was clicked on the page
//   var language = event.target.getAttribute('data-language');

//   // If there is no language read from the button, don't attempt to fetch repos
//   if (language) {
//     getFiveDays(language);

//     repoContainerEl.textContent = '';
//   }
// };

var getWeatherInfo = function (city) {
  var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="  + city + "&appid=" + ApiKey;

  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        //console.log(response);
        response.json().then(function (data) {
          //console.log(data);
          displayWeather(data, city);
        });
    //   } else {
    //     alert('Error: ' + response.statusText);
    //   }
    // })
    // .catch(function (error) {
    //   alert('Unable to connect to GitHub');
    // });
};

var getFiveDays = function (fivedays) {
  // The `q` parameter is what language we want to query, the `+is:featured` flag adds a filter to return only featured repositories
  // The `sort` parameter will instruct GitHub to respond with all of the repositories in order by the number of issues needing help
  var weatherUrl = 'https://api.github.com/search/repositories?q=' + fivedays + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data.items, fivedays);
      });
    // } else {
    //   alert('Error: ' + response.statusText);
    // }
  // });
};

var displayWeather = function (wx, citySearching) {
  if (wx.length === 0) {
    repoContainerEl.textContent = 'No Weather Information Found';
    // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
    return;
  }

  wxSearchTerm.textContent = citySearching;

  for (var i = 0; i < wx.length; i++) {
    // The result will be `<github-username>/<github-repository-name>`
    var cityName = wx[i]//.owner.login + '/' + repos[i].name;

    var cityEl = document.createElement('div');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
//languageButtonsEl.addEventListener('click', buttonClickHandler);
