const { expect, assert } = require('chai');
const { extractForecast, extractErrorMessage, displayWeather, displayErrorMessage  } = require('../scripts/work');

describe('Getting data from response', () => {
  const response = {
    "coord":{"lon":37.62,"lat":55.75},
    "weather":[{"id":701,"main":"Mist","description":"mist","icon":"50n"}],
    "base":"stations",
    "main":{"temp":4.38,"pressure":1015,"humidity":100,"temp_min":2,"temp_max":5.56},
    "visibility":3000,
    "wind":{"speed":4,"deg":90},
    "clouds":{"all":90},
    "dt":1573170827,
    "sys":{"type":1,"id":9027,"country":"RU","sunrise":1573188558,"sunset":1573220232},
    "timezone":10800,
    "id":524901,
    "name":"Moscow",
    "cod":200
  };

  it('get from response with existing city', () => {
    const exp =
    {
        cod: 200,
        city: "Weather in Moscow",
        description: " is mist",
        parameters:
            [
                {
                    name: "Temperature",
                    value: 4.38,
                    units: "&deg;C"
                },
                {
                    name: "Pressure",
                    value: 1015,
                    units: "hPa",
                },
                {
                    name: "Wind speed",
                    value: 4,
                    units: "m/s",
                },
                {
                    name: "Humidity",
                    value: 100,
                    units: "%",
                },
                {
                    name: "Clouds",
                    value: 90,
                    units: "%",
                },
                {
                    name: "Visibility",
                    value: 3000,
                    units: "m",
                },

            ],
    };
    const real = extractForecast(response);
    expect(real).to.eql(exp);
  });

  it('get from response with not existing city', () => {
    const response = "city not found";
    const exp = {
      "message":"city not found"
    };
    const real = extractErrorMessage(response);
    expect(real).to.eql(exp);
  });
});

describe("Building htmlTree", () => {
  it("htmlTree for correct city", () => {
    const forecast  =
    {
        cod: 200,
        city: "Weather in Moscow",
        description: " is mist",
        parameters:
            [
                {
                    name: "Temperature",
                    value: 4.38,
                    units: "&deg;C",
                },
                {
                    name: "Pressure",
                    value: 1015,
                    units: "hPa",
                },
                {
                    name: "Wind speed",
                    value: 4,
                    units: "m/s",
                },
                {
                    name: "Humidity",
                    value: 100,
                    units: "%",
                },
                {
                    name: "Clouds",
                    value: 90,
                    units: "%",
                },
                {
                    name: "Visibility",
                    value: 3000,
                    units: "m",
                },

            ],
    };
    const bodyHtml = '<h1>{{city}}{{description}}</h1>'+
    '<div id="weather-parameters">'+
    '{{#each parameters}}'+
        '<div id="parameter">'+
            '<div class="parameter-type">{{name}}: {{value}} {{{units}}}</div>'+
        '</div>'+
    '{{/each}}'+
    '</div>';
    let expectedTree =  '<h1>Weather in Moscow is mist</h1>'+
           '<div id="weather-parameters">'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Temperature: 4.38 &deg;C</div>'+
               '</div>'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Pressure: 1015 hPa</div>'+
               '</div>'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Wind speed: 4 m/s</div>'+
               '</div>'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Humidity: 100 %</div>'+
               '</div>'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Clouds: 90 %</div>'+
               '</div>'+
               '<div id="parameter">'+
                   '<div class="parameter-type">Visibility: 3000 m</div>'+
               '</div>'+
           '</div>';
      expect(displayWeather(bodyHtml, forecast)).to.eql(expectedTree);
  });
  it("htmlTree for not correct city", () => {
    const message  =
    {
        message: 'city not found',
    };
    const bodyHtml = '<h1>{{message}}</h1>';
    let expectedTree =  '<h1>city not found</h1>';
      expect(displayErrorMessage(bodyHtml, message)).to.eql(expectedTree);
  });
});
