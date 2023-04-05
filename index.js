const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT || 8000

const app = express()


// middleware for bodyparser
app.use(express.urlencoded({ extended: true }));

// get settings
const settings = require('./config/settings')

const db = settings.atlasUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log(err))

// Get profile routes
const profile = require('./routes/api/profile')

app.get('/', (req, res) => {
    res.send('Project is Running')
})

// actual routes
// app.use('/api/profile', profile)

app.listen(port, () => console.log(`App running at port : ${port}`))