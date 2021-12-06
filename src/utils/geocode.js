const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5tb256aSIsImEiOiJja3dueW42cGMwYzd3MnBuenViOHh1NjNvIn0.DT-k9nNY7C1cYbJ3UpEZ2w&limit=1`

    request({ url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode
}


// Geocoding
// Address -> Lat/Long -> Weather from weatherstack
// const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYW5tb256aSIsImEiOiJja3dueW42cGMwYzd3MnBuenViOHh1NjNvIn0.DT-k9nNY7C1cYbJ3UpEZ2w&limit=1'

// request({ url: geoUrl, json: true }, (err, res) => {
//     const latitude = res.body.features[0].center[1]
//     const longitude = res.body.features[0].center[0]
//     if (err) {
//         console.log('Unable to connect to mapbox')
//     } else if (res.body.features.length === 0) {
//         console.log('Unable to find location, try again')
//     } else {
//         console.log(`The latitude is ${latitude} and the longitude is ${longitude}`)
//     }
// })