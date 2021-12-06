const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e5263baac69ee6113bac70fef0056b48&query=${lat},${long}&units=f`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and feels like ${body.current.feelslike} degrees.`)
        }
    })
}


module.exports = {
    forecast
}


// const weatherUrl = 'http://api.weatherstack.com/current?access_key=e5263baac69ee6113bac70fef0056b48&query=37.8267,-122.4233&units=f'

// request({ url: weatherUrl, json: true }, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to weather service')
//     } else if (res.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(`${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature} degrees out and feels like ${res.body.current.feelslike} degrees.`)
//     }
// })