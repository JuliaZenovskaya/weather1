import { extractForecast, extractErrorMessage, displayWeather, displayErrorMessage } from './work.js';

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
                let sourceWeather = document.getElementById("weather-template").innerHTML;
                let sourceError = document.getElementById("message-template").innerHTML;
                if (response.ok) {
                    const forecast = extractForecast(json);
                    document.getElementById("weather-container").innerHTML = displayWeather(sourceWeather, forecast);
                    document.getElementById("message-container").innerHTML = displayErrorMessage(sourceErrornull);
                } else {
                    const error = extractErrorMessage(json.message);
                    document.getElementById("message-container").innerHTML = displayErrorMessage(sourceError,error);
                    document.getElementById("weather-container").innerHTML = displayWeather(sourceWeather,null);
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
