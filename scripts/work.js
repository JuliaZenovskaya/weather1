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
        cod: cod,
    } = json;

    let forecast =
    {
        cod: cod,
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

export function extractErrorMessage(error) {
  let message = {
    message: error,
  }

  return message;
}

export function displayWeather(forecast) {
    let source = document.getElementById("weather-template").innerHTML;
    let template = Handlebars.compile(source);

    let html = template(forecast);
    document.getElementById("weather-container").innerHTML = html;
}


export function displayErrorMessage(message) {
  let source = document.getElementById("message-template").innerHTML;
  let template = Handlebars.compile(source);

  let html = template(message);
  document.getElementById("message-container").innerHTML = html;
}

//exports.extractForecast = extractForecast;
//exports.extractErrorMessage = extractErrorMessage;
//exports.getWeather = getWeather;
