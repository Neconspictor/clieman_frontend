const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

const TOKEN_NAME = 'authentication_key'

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
            const clients = JSON.parse(fs.readFileSync('./db/clients.json'))
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
            const events = JSON.parse(fs.readFileSync('./db/events.json'))
            res.json({
                events: events,
            })
        }
    })
})

app.post('/changePassword', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            handleChangePassword(req, res)
        }
    })
})

function handleChangePassword(req, res) {
    var errorsToSend = []
    const userDB = JSON.parse(fs.readFileSync('./db/user.json'))
    const newUser = JSON.parse(JSON.stringify(userDB))

    if (req.body) {
        const data = {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            confirmationPassword: req.body.confirmationPassword,
        }

        console.log('data = ', data)

        if (data === null || data === undefined) {
            errorsToSend.push('noPasswordData')
        }

        if (!data.newPassword || data.newPassword.length < 8) {
            errorsToSend.push('newPasswordTooShort')
        }

        if (data.newPassword !== data.confirmationPassword) {
            errorsToSend.push('invalidConfirmationPassword')
        }

        if (userDB.password !== data.oldPassword) {
            errorsToSend.push('invalidOldPassword')
        }

        newUser.password = data.newPassword
        const newUserData = JSON.stringify(newUser, null, 2)

        if (errorsToSend.length > 0) {
            res.status(400).json({ errors: errorsToSend })
        } else {
            fs.writeFile('./db/user.json', newUserData, err => {
                if (err) {
                    console.log(err + newUserData)
                } else {
                    const token = jwt.sign({ newUser }, TOKEN_NAME)
                    res.json({
                        token,
                        email: newUser.email,
                        username: newUser.username,
                    })
                }
            })
        }
    } else {
        res.sendStatus(400)
    }
}

app.post('/changeEmail', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            handleChangeEmail(req, res)
        }
    })
})

function handleChangeEmail(req, res) {
    var errorsToSend = []
    const userDB = JSON.parse(fs.readFileSync('./db/user.json'))
    const newUser = JSON.parse(JSON.stringify(userDB))

    if (req.body) {
        const data = {
            email: req.body.email,
        }

        console.log('data = ', data)

        if (!data.email) {
            errorsToSend.push('noValidEmail')
        }

        if (data.email === userDB.email) {
            errorsToSend.push('emailAlreadyExists')
        }

        if (errorsToSend.length > 0) {
            res.status(400).json({ errors: errorsToSend })
        } else {
            newUser.email = data.email
            const newUserData = JSON.stringify(newUser, null, 2)
            fs.writeFile('./db/user.json', newUserData, err => {
                if (err) {
                    console.log(err + newUserData)
                } else {
                    const token = jwt.sign({ newUser }, TOKEN_NAME)

                    res.json({
                        token,
                        email: newUser.email,
                        username: newUser.username,
                    })
                }
            })
        }
    } else {
        res.sendStatus(400)
    }
}

app.post('/changeUserName', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            handleChangeUserName(req, res)
        }
    })
})

function handleChangeUserName(req, res) {
    var errorsToSend = []
    const userDB = JSON.parse(fs.readFileSync('./db/user.json'))
    const newUser = JSON.parse(JSON.stringify(userDB))

    if (req.body) {
        const data = {
            username: req.body.username,
        }

        preprocess(data)
        preprocess(userDB)

        console.log('data = ', data)

        if (data === null || data === undefined) {
            errorsToSend.push('noUserName')
        }

        if (data.username === userDB.username) {
            errorsToSend.push('userNameAlreadyExists')
        }

        if (errorsToSend.length > 0) {
            res.status(400).json({ errors: errorsToSend })
        } else {
            newUser.username = data.username
            const newUserData = JSON.stringify(newUser, null, 2)
            fs.writeFile('./db/user.json', newUserData, err => {
                if (err) {
                    console.log(err + newUserData)
                } else {
                    const token = jwt.sign({ newUser }, TOKEN_NAME)
                    res.json({
                        token,
                        email: newUser.email,
                        username: newUser.username,
                    })
                }
            })
        }
    } else {
        res.sendStatus(400)
    }
}

app.post('/createClient', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            if (req.body) {
                handleCreateClient(req, res)
            } else {
                res.sendStatus(400)
            }
        }
    })
})

function handleCreateClient(req, res) {
    const client = {
        email: req.body.email,
        sex: req.body.sex,
        name: req.body.name,
        forename: req.body.forename,
        birthday: req.body.birthday,
        address: req.body.address,
        id: req.body.id,
    }

    var errorsToSend = []

    const clients = JSON.parse(fs.readFileSync('./db/clients.json'))

    //id mustn't be undefined/null or empty

    if (!client.id) {
        errorsToSend.push('noId')
    }

    // check that id is unique
    if (
        clients.filter(c => {
            return c.id === client.id
        }).length != 0
    ) {
        errorsToSend.push('idAlreadyExists')
    }

    if (errorsToSend.length > 0) {
        res.status(400).json({ errors: errorsToSend })
    } else {
        clients.push(client)

        fs.writeFile('./db/clients.json', JSON.stringify(clients), err => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    clients: clients,
                })
            }
        })
    }
}

app.post('/createEvent', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            if (req.body) {
                handleCreateEvent(req, res)
            } else {
                console.log('no body')
                res.sendStatus(400)
            }
        }
    })
})

function handleCreateEvent(req, res) {
    const event = {
        end: req.body.end,
        start: req.body.start,
        sex: req.body.sex,
        name: req.body.name,
        clients: req.body.clients,
        color: req.body.color,
        details: req.body.details,
        id: req.body.id,
    }

    var errorsToSend = []

    const events = JSON.parse(fs.readFileSync('./db/events.json'))
    const clients = JSON.parse(fs.readFileSync('./db/clients.json'))

    //id mustn't be undefined/null or empty

    if (!event.id) {
        errorsToSend.push('noId')
    }

    // check that id is unique
    if (
        events.filter(e => {
            return e.id === event.id
        }).length != 0
    ) {
        errorsToSend.push('idAlreadyExists')
    }

    //clients array elements should refer to valid clients
    if (Array.isArray(event.clients)) {
        for (let clientID of event.clients) {
            const filtered = clients.filter(c => {
                return c.id === clientID
            })

            if (filtered.length === 0) {
                errorsToSend.push('clientsNotValid')
                break
            }
        }
    } else {
        errorsToSend.push('clientsNotValid')
    }

    if (errorsToSend.length > 0) {
        res.status(400).json({ errors: errorsToSend })
    } else {
        events.push(event)

        fs.writeFile('./db/events.json', JSON.stringify(events), err => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    events: events,
                })
            }
        })
    }
}

app.post('/register', (req, res) => {
    if (req.body) {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        const data = JSON.stringify(user, null, 2)
        const userDB = JSON.parse(fs.readFileSync('./db/user.json'))
        preprocess(user)
        preprocess(userDB)

        var errorsToSend = []

        if (
            user.email === null ||
            user.email === undefined ||
            user.email === ''
        ) {
            errorsToSend.push('noEmail')
        }

        if (userDB.email === user.email) {
            errorsToSend.push('emailAlreadyExists')
        }
        if (userDB.username === user.username) {
            errorsToSend.push('userNameAlreadyExists')
        }
        if (user.password.length < 8) {
            errorsToSend.push('passwordTooShort')
        }

        console.log('user: ', user)
        console.log('userDB: ', userDB)
        console.log('errorsToSend: ', errorsToSend)

        if (errorsToSend.length > 0) {
            res.status(400).json({ errors: errorsToSend })
        } else {
            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ user }, TOKEN_NAME)
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

app.post('/updateEvent', verifyToken, (req, res) => {
    jwt.verify(req.token, TOKEN_NAME, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            if (req.body) {
                handleUpdateEvent(req, res)
            } else {
                console.log('no body')
                res.sendStatus(400)
            }
        }
    })
})

function handleUpdateEvent(req, res) {
    const event = {
        end: req.body.end,
        start: req.body.start,
        sex: req.body.sex,
        name: req.body.name,
        clients: req.body.clients,
        color: req.body.color,
        details: req.body.details,
        id: req.body.id,
    }

    console.log('event: ', event)

    var errorsToSend = []

    const events = JSON.parse(fs.readFileSync('./db/events.json'))
    const clients = JSON.parse(fs.readFileSync('./db/clients.json'))

    //id mustn't be undefined/null or empty

    if (!event.id) {
        errorsToSend.push('noId')
    }

    // check that id matches an existing event
    if (
        events.filter(e => {
            return e.id === event.id
        }).length == 0
    ) {
        errorsToSend.push('noExistingEventFound')
    }

    //clients array elements should refer to valid clients
    if (Array.isArray(event.clients)) {
        for (let clientID of event.clients) {
            const filtered = clients.filter(c => {
                return c.id === clientID
            })

            if (filtered.length === 0) {
                errorsToSend.push('clientsNotValid')
                break
            }
        }
    } else {
        errorsToSend.push('clientsNotValid')
    }

    if (errorsToSend.length > 0) {
        console.log('errorsToSend: ', errorsToSend)
        res.status(400).json({ errors: errorsToSend })
    } else {
        events.forEach((e, i) => {
            if (e.id == event.id) {
                events[i] = event
            }
        })

        fs.writeFile('./db/events.json', JSON.stringify(events), err => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    events: events,
                })
            }
        })
    }
}

app.post('/login', (req, res) => {
    const userDB = fs.readFileSync('./db/user.json')
    const userInfo = JSON.parse(userDB)

    const data = {
        authName: req.body ? req.body.authName : undefined,
        password: req.body ? req.body.password : undefined,
    }

    preprocess(data)
    preprocess(userInfo)

    console.log('data: ', data)
    console.log('userInfo: ', userInfo)

    if (
        req.body &&
        data.authName &&
        (data.authName === userInfo.email ||
            data.authName === userInfo.username) &&
        data.password === userInfo.password
    ) {
        const token = jwt.sign({ userInfo }, TOKEN_NAME)
        res.json({
            token,
            email: userInfo.email,
            username: userInfo.username,
        })
    } else {
        res.status(401).json({
            errors: ['invalidLogin'],
        })
    }
})

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
