const express = require('express')
const helmet = require('helmet')
const userRouter = require('./users/users-router')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api/users', userRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    const { status, message, stack } = err
    res.status(status || 500).json({ message, stack })
})

module.exports = server