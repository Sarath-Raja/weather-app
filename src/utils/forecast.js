const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e3e54c5c72fb603638f79646631440e9&query=${latitude},${longitude}`;
    request({url, json:true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to weather service');
        else if(body.error)
            callback('Unable to find location. Try an other search');
        else
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out but it feels like ${body.current.feelslike} degrees. 
            The humidity is ${body.current.humidity}%`)
    });
}

module.exports = forecast;