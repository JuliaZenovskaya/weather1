

const WEATHER = document.getElementById("weather-container");
const ERROR = document.getElementById("error-container");

window.onload = () => {
    const input = document.getElementById("input-form");
    input.addEventListener("submit", onSubmit);
};

function onSubmit(e) {
    e.preventDefault();
    const city = e.currentTarget.elements.inputfield.value;
    getWeather(city)
        .then(response => {
            response.json()
            .then(json => {
                if (response.ok) {
                    const forecast = extractForecast(json);
                    displayWeather(forecast);
                    displayErrorMessage(null);
                } else {
                    const error = extractErrorMessage(json.message);
                    displayErrorMessage(error);
                    displayWeather(null);
                }
            });
        },
        error => displayErrorMessage(error));
}

function getWeather(city) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
        + city +
        "&appid=e972dcd233bab1ebce419c370711921f&units=metric&lang=en";
    return fetch(url);
}

function extractForecast(json) {
    const {
        name: city,
        main:
        {
            temp: temperature,
            pressure,
            humidity,
        } = {},
        wind:
        {
            speed: wind,
        } = {},
        clouds:
        {
            all: clouds,
        } = {},
        visibility: visibility,
    } = json;

    let forecast =
    {
        city: "Weather in " + city,
        description: " is " + json.weather[0].description,
        parameters:
            [
                {
                    name: "Temperature",
                    value: temperature,
                    units: "&deg;C"
                },
                {
                    name: "Pressure",
                    value: pressure,
                    units: "hPa",
                },
                {
                    name: "Wind speed",
                    value: wind,
                    units: "m/s",
                },
                {
                    name: "Humidity",
                    value: humidity,
                    units: "%",
                },
                {
                    name: "Clouds",
                    value: clouds,
                    units: "%",
                },
                {
                    name: "Visibility",
                    value: visibility,
                    units: "m",
                },
            ],
    };

    return forecast;
}

function extractErrorMessage(error) {
  let message = {
    message: error,
  }

  return message;
}

function displayWeather(forecast) {
    let source = document.getElementById("weather-template").innerHTML;
    let template = Handlebars.compile(source);

    let html = template(forecast);
    document.getElementById("weather-container").innerHTML = html;
}


function displayErrorMessage(message) {
  let source = document.getElementById("message-template").innerHTML;
  let template = Handlebars.compile(source);

  let html = template(message);
  document.getElementById("message-container").innerHTML = html;
}
