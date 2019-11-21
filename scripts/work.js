const Handlebars = require('handlebars');

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

export function displayWeather(source, forecast) {
    let template = Handlebars.compile(source);
    let html = template(forecast);
    return html;
}


export function displayErrorMessage(source, message) {
  let template = Handlebars.compile(source);
  let html = template(message);
  return html;
}
