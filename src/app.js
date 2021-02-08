const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths to express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Sarath Raja"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Sarath Raja"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text",
        title: "Name",
        name: "Sarath Raja"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide address value"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error: err})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error: "Please provide search value "
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessagge: "Help article not found",
        title: "404 Help",
        name: "Sarath Raja"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessagge: "Page Not Found",
        title: "404",
        name: "Sarath Raja"
    })
})

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})