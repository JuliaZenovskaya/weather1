import weatherTemplate from "handlebars-loader!../model/weather-parametrs.hbs";
import errorTemplate from "handlebars-loader!../model/erroe-parametrs.hbs";

const WEATHER = document.getElementById("weather-container");
const ERROR = document.getElementById("error-container");

window.onload = () => {
    const input = document.getElementById("input-form");
    input.addEventListener("submit", onSubmit);
};

function onSubmit(e) {
    e.preventDefault();

    const city = e.currentTarget.elements.input.value;
    getWeather(city)
        .then(response => {
            response.json()
            .then(json => {
                if (response.ok) {
                    const forecast = extractForecast(json);
                    displayWeather(forecast);

                    const cityName = json.name;
                    const imgHref = "https://openweathermap.org/img/wn/" + json.weather[0].icon + ".png";
                    updateTab("Weather in " + cityName, imgHref);
                } else {
                    displayError(json.message);
                }
            });
        },
        error => displayError(error));
}

export function getWeather(city) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
        + city +
        "&appid=e972dcd233bab1ebce419c370711921f&units=metric&lang=en";
    return fetch(url);
}

export function extractForecast(json) {
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
        city: city,
        description: json.weather[0].description,
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

export function displayWeather(weather) {
    const weatherHtml = weatherTemplate(weather);
    WEATHER.innerHTML = weatherHtml;
    ERROR.innerHTML = "";
}

export function displayError(message) {
    const errorHtml = errorTemplate({ message });
    WEATHER.innerHTML = "";
    ERROR.innerHTML = errorHtml;
}

export function updateTab(newTitle) {
    document.title = newTitle;
}
