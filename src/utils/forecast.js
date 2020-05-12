const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cc1cc25dbdd8d84203adaa58537499b6&query= '+ latitude + ',' + longitude    

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast