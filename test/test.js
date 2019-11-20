const { expect, assert } = require('chai');
const { extractForecast, extractErrorMessage, getWeather } = require('../scripts/work');

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

/*  it("6 elements from response with existing city", function() {
    const elements = 6;
    const forecast = extractForecast(response);
    let len = 0;
    forecast.parameters.forEach(parameter => {
      len = len + 1;
    });
    expect(len).to.eql(elements);
  });

  it("elements from response contains 'name', 'value', 'units'", function() {
    const forecast = extractForecast(response);
    forecast.parameters.forEach(parameter => {
      expect(parameter).to.be.an('object').that.have.property("name");
      expect(parameter).to.be.an('object').that.have.property("value");
      expect(parameter).to.be.an('object').that.have.property("units");
    });
  });*/
});

describe('Correct request status', () => {
  it('request with correct city', () => {
    const city = "Moscow";
    getWeather(city)
        .then(response => {
          try {
            expect(response.ok).to.be.true;
          } catch (error) {
            console.log("First test 'request with correct city' crashed: ");
            console.log("Message: " + error.message);
            console.log("Actual: " + error.actual);
            console.log("Expected: " + error.expected);
          }
        });
  });
  it('request with not correct city', () => {
    const city = "Mosco";
    getWeather(city)
        .then(response => {
          try {
            expect(response.ok).to.be.false;
          } catch (error) {
            console.log("Second test 'request with not correct city' crashed: ");
            console.log("Message: " + error.message);
            console.log("Actual: " + error.actual);
            console.log("Expected: " + error.expected);
          }
        });
  });
});
