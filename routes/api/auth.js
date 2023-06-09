const express = require('express')
const bcrypt = require('bcryptjs')
var cookie = require('cookie-parser')
const jsonwt = require('jsonwebtoken')
const passport = require('passport')

// getting setting
const settings = require('../../config/settings')

const router = express.Router()

const Person = require('./../../models/Person')

router.use(cookie())

// Route to register a user
// [POST] http://localhost:8000/api/auth/register
router.post('/register', (req, res) => {
    // check if username is already in collection.
    Person
        .findOne({username: req.body.username})
        .then(person => {
            if (person) {
                res.status(400).send('Username already there.')
            } else {
                
                const person = Person({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                })

                // encrypting the password using bcryptjs
                bcrypt.genSalt(10, (err, salt) => {
                    // salt is provided in salt variable.
                    bcrypt.hash(person.password, salt, (err, hash) => {
                        if(err) {
                            return res.status(400).send('Not Registered, Contact Admin!')
                        }
                        else {
                            // hashed password
                            person.password = hash

                            // add new person with hashed password.
                            person
                                .save()
                                .then(person => 
                                    // res.send('add success')
                                    res.status(200).render('index', { message: 'add success'})
                                )
                                .catch(err => res.send(err.message))
                        }
                    })
                })
            }
        })
        .catch(err => res.send(err))
})

// Route to login a user
// [POST] http://localhost:8000/api/auth/login
router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password // 123456

    console.log("bodyparserun" + req.body.username)
    console.log("bodyparserps" + req.body.password)
    // check if username is already in collection.
    Person
        .findOne({username: username})
        .then(person => {
            if (person) {
                // compare the password
                bcrypt
                    .compare(password, person.password)
                    .then(
                        (isCompared) => {
                            if(isCompared) {
                                // res.cookie('session_id', '123')
                                // res.send('Login Success')
                                
                                // generate JWT
                                const payload = {
                                    id: person.id, 
                                    name: person.name,
                                    username: person.username
                                }
                                
                                // jsonwebtoken method used to create token.
                                jsonwt.sign(
                                    payload,
                                    settings.secret,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        console.log(err)
                                        res.status(200).json({
                                            success: true,
                                            token: 'Bearer ' + token
                                        })
                                        // const jsonObj = {success: true, token: 'Bearer ' + token}
                                        // console.log(jsonObj)
                                        // res.status(200).render('index', { message: JSON.stringify(jsonObj) })
                                    }
                                )
                            }
                            else {
                                // res.status(401).send('Password is not correct')
                                res.status(401).json({
                                    success: false,
                                    token: "no such password"
                                })
                            }
                        }
                    )
                    .catch()
            } else {
                // res.status(400).send('Username is not there.')
                res.status(401).json({
                    success: false,
                    token: "no such user"
                })
            }
        })
})

// function validateCookie(req, res, next) {
//     const {cookies} = req;

//     if('session_id' in cookies) {
//         if(cookies.session_id == 123) {
//             next()
//         }else{
//             res.status(403).send('Not Authorized')
//         }
//     }
// }

// Private route to get all user details
// [GET] http://localhost:8000/api/auth/get
router.get(
    '/get',
    passport.authenticate('jwt', { session: false }), // middleware from passport-jwt
    async(req, res) => {
    let people_un = []
    const cursor = await Person.find()
    cursor.forEach((person) => {
        people_un.push(person.username)
    })
    res.send(people_un)
})

// [GET] http://localhost:8000/api/auth/register
router.get('/register', (req, res) => {
    res.render("register", {})
})

// [GET] http://localhost:8000/api/auth/login
router.get('/login', (req, res) => {
    res.render("login", {})
})

module.exports = router