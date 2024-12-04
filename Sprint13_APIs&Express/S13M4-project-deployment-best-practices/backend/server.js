const express = require('express')
const { validateUser, errorHandler } = require('./middleware')
const Users = require('./users-model')

const server = express()

server.use(express.json())


server.get('/api/users', (req, res, next) => {
    try {
        const users = Users.getUsers()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})

server.post('/api/register', validateUser, (req, res, next) => {
    try {
        const user = Users.registerUser(req.body)
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
})

server.post('/api/login', validateUser, (req, res, next) => {
    try {
        const { status, message } = Users.loginUser(req.body)
        res.status(status).json({ message })
    } catch (err) {
        next(err)
    }
})

server.use(errorHandler)


module.exports = server