

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()

const port = process.env.PORT || 3003

//variables
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname , '../public') ) )

//http routes
app.get('' , (req, res) => {
	res.render('index', {
		title: "Weather app",
		name : "Alvaro"
	})
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products' , (req, res) => {

	if (!req.query.search) {
		return res.send({
			error:'You must provide  a search term'
		})
	}
	res.send({
		products:[]
	})
})

app.get('/about' , (req, res) => {
	res.render('about', {
		title: "About page",
		name : "Alvaro"
	})
})

app.get('/help' , (req, res) => {
	res.render('help', {
		title: "Help",
		helpText : "Alvaro"
	})
})
//
//app.get('/help' , (req, res) => {
//	res.send(
//	{
//		name:'Alvaro',
//		age: 27
//	})
//})
//
//app.get('/about' , (req, res) => {
//	res.send('<h1>About</h1>')
//})

app.get('/about/*' , (req, res) => {
	res.render('404', {
		title: "Error Message",
		error : "Article not found.",
	})
})
app.get('*' , (req, res) => {
	res.render('404', {
		title: "Error Message",
		error : "404 Page not found.",
	})

})


app.listen(port , () => {
	console.log("Server is up on port "+ port)
})