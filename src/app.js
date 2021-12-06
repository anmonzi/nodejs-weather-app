const path = require('path')
const express = require('express')
const hbs = require('hbs')

const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast.js')

// Create an Express application
const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials' )

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashton Snow'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ashton Snow'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ashton Snow',
        description: 'This is the help page, let us know if you need help!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                res.send({ err })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Wildcard /(*) for 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Your help article not found',
        name: 'Ashton Snow'
    })
})

// Wildcard (*) url for 404
// Comes last so all other routes are filtered through first
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        description: 'Page not found',
        name: 'Ashton Snow'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})





// app.com  // root route
// Hard coded examples of app.get and res.send // static
// app.get('', (request, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Ashton',
//         age: 32
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })