const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const events = require('./db/events.json')
const clients = require('./db/clients.json')

const app = express()

const TOKEN_NAME = 'authentication_key'

var dbUser = require('./db/user.json')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API.',
    })
})

function preprocess(user) {
    if (user.username) {
        user.username = user.username.toLowerCase()
    }

    if (user.email) {
        user.email = user.email.toLowerCase()
    }

    if (user.authName) {
        user.authName = user.authName.toLowerCase()
    }
}

app.get('/clients', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            res.json({
                clients: clients,
            })
        }
    })
})

app.get('/events', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            res.json({
                events: events,
            })
        }
    })
})

app.post('/register', (req, res) => {
    if (req.body) {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            // In a production app, you'll want to encrypt the password
        }

        preprocess(user)

        const data = JSON.stringify(user, null, 2)

        var errorsToSend = []

        if (user === null || user === undefined) {
            errorsToSend.push('No credentials provided.')
        }

        //if (user.name === null || user.name === undefined || user.name === '') {
        //    errorsToSend.push('Name is not specified')
        //}

        if (
            user.email === null ||
            user.email === undefined ||
            user.email === ''
        ) {
            errorsToSend.push('E-mail is not specified')
        }

        if (dbUser.email === user.email) {
            errorsToSend.push('An account with this email already exists.')
        }
        if (dbUser.username === user.username) {
            errorsToSend.push('An account with this user name already exists.')
        }
        if (user.password.length < 5) {
            errorsToSend.push('Password too short.')
        }

        console.log('user: ', user)
        console.log('dbUser: ', dbUser)
        console.log('errorsToSend: ', errorsToSend)

        if (errorsToSend.length > 0) {
            res.status(400).json({ errors: errorsToSend })
        } else {
            dbUser = user

            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ user }, 'the_secret_key')
                    // In a production app, you'll want the secret key to be an environment variable
                    res.json({
                        token,
                        email: user.email,
                        username: user.username,
                    })
                }
            })
        }
    } else {
        res.sendStatus(400)
    }
})

app.post('/login', (req, res) => {
    const userDB = fs.readFileSync('./db/user.json')
    const userInfo = JSON.parse(userDB)

    const data = {
        authName: req.body ? req.body.authName : undefined,
        password: req.body ? req.body.password : undefined,
    }

    preprocess(data)

    console.log('data: ', data)
    console.log('userInfo: ', userInfo)

    if (
        req.body &&
        (data.authName === userInfo.email ||
            data.authName === userInfo.username) &&
        data.password === userInfo.password
    ) {
        const token = jwt.sign({ userInfo }, TOKEN_NAME)
        // In a production app, you'll want the secret key to be an environment variable
        res.json({
            token,
            email: userInfo.email,
            username: userInfo.username,
        })
    } else {
        res.status(401).json({ errors: ['Invalid login. Please try again.'] })
    }
})

// MIDDLEWARE
// eslint-disable-next-line no-unused-vars
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(401)
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000')
})
