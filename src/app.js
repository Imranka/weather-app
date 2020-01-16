const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//** Setup custom paths 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname, '../public')

//** Setup viewengine & viewengine path 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//**setup static directory path
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        logo_name: "Floorindex.com",
        title: "Welcome to FloorIndex",
        service: "PayingGuest Service"
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.loc){
        return res.send({
            error: "Please input valid search parameters",
            status: 'Failure'
        })
    }

    geocode(req.query.loc,(error, {latitude, longitude, location}={}) => {
        if(error)
        {
            return res.send({
                error,
                status: 'Failure'
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error,
                    status: 'Failure'
                })
            }

            if(forecastData){
                return res.send({
                    weather: forecastData,
                    location: location,
                    address: req.query.loc
                })
            }
        })            
    })
})

app.get('/about-us', (req, res) => {
    res.render('about-us',{
        logo_name: "Floorindex.com",
        title: 'About Us',
        description: 'WE are one of the leading Real-estate service providers'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        logo_name: "Floorindex.com",
        title: 'Help Articles',
        message: 'This is some helpful text'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error-404',{
        logo_name: "Floorindex.com",
        title: '404 - Content Not Found',
        message: 'No helpful article found on this page'
    })
})

app.get('*', (req, res) => {
    res.render('error-404',{
        logo_name: "Floorindex.com",
        title: '404 - Content Not Found',
        message: 'Sorry, the page you looking for doesn\'t exists'
    })
})

app.get('/weather', (req, res) => {
    res.send('Weather page')
})

app.listen(port, ()=>{
    console.log('Server is up and running on port ' + port)
});

// console.log(__dirname);
// console.log(__filename)