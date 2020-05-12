const path = require('path')

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')


const express = require('express')

const hbs= require('hbs')

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialspath)

app.set('view engine', 'hbs')

app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: ' Shubham Dhiman',
        foot: 'Thanks for visiting'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubham Dhiman',
        foot: 'Thanks for visiting'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'we are here for help',
        helpText: 'This is some helpful text.',
        name: 'Shubham Dhiman',
        foot: 'Thanks for visiting'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'No address found'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude ,location} =  {})=>{
        if(error){
            return res.send({error})
        }

        console.log(latitude, longitude , location)
        
        forecast(latitude, longitude, (error ,  forecastData)=>{
            if(error){
                return res.send({error})
            }

        res.send({
            forecast : forecastData,
            location,
            address : req.query.address
        })
    })
    })

})


app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'page not found for help route',
        errorMessage: 'Invalid routr for help link',
        name: 'Shubham Dhiman'
    })
})


// the "*" will look for all routes and if not matched will run this route
app.get('*', (req, res)=>{
    res.render('404',{
        title: 'Page not found',
        errorMessage: 'Invalid route!',
        name: 'shubham dhiman'
    })

})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


//Default function parameter
// const x = (name = 'user' )=>{
//     console.log(name)
// }

// x();