const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('./users-model')

const {
    checkValidBody
} = require('./users-middleware')

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username })
        if (!user || !bcrypt.compareSync(password, user.password)) {
            next({ status: 401, message: "Login failed, bad ef credentials" })
        } else {
            res.status(200).json({ message: `Welcome back, ${username}!` })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/register', checkValidBody, (req, res, next) => {
    Users.add(req.body)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(next)
})

router.get('/users', (req, res, next) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
})

module.exports = router