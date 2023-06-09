const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
var path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
require('dotenv').config();

const port = process.env.PORT || 8000

const app = express()


// middleware for bodyparser
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// adding middleware to serve static files under public foloder, such as style.css
app.use(express.static(path.join(__dirname, 'public')));

// get config settings
const settings = require('./config/settings')

const db = settings.atlasUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => {
        console.log('MongoDB connected successfully.')
        app.listen(port, () => console.log(`App running at port : ${port}`))
    })
    .catch(err => console.log(err))

// setup handlebars with default layout file main.hbs
app.engine(
    '.hbs',
    exphbs.engine(
        {
            extname: '.hbs',
            helpers: {
            }
        }
    )
)

app.set(
    'view engine',
    '.hbs'
)

// Get data routes
const data = require('./routes/api/data')
const auth = require('./routes/api/auth')

// [GET] http://localhost:8000/
app.get('/', (req, res) => {
    res.render('index', { message: 'Project is Running'});
})

// actual routes: mapping data routes to /api/data endpoints 
app.use('/api/data', data)
app.use('/api/auth', auth)

// Config for JWT strategy
require('./strategies/jsonwtStrategy')(passport)

// Handles all not found URLs
app.get('*', function (req, res) {
    res.render('index', { message: 'Wrong Route' });
});