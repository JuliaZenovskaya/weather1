import { extractForecast, extractErrorMessage, getWeather, displayWeather, displayErrorMessage } from "../work";


window.onload = () => {
    const input = document.getElementById("input-form");
    input.addEventListener("submit", onSubmit);
    console.log("here");
};

function onSubmit(e) {
  console.log("here2");
    e.preventDefault();
    const city = e.currentTarget.elements.inputfield.value;
    getWeather(city)
        .then(response => {
            response.json()
            .then(json => {
              console.log("here3");
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
