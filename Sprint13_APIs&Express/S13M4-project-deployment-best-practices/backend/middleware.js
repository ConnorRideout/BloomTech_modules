let users = [
    {
        id: 1,
        username: "JohnDoe",
        password: "pass123"
    }
]

function validateUser(req, res, next) {
    const { username, password } = req.body
    if (
        username &&
        typeof username == 'string' &&
        username.trim() &&
        password &&
        typeof password == 'string' &&
        password.trim()
    ) {
        next()
    } else {
        next({ status: 422, message: "Please provide a valid username and password" })
    }
}

function errorHandler(err, req, res, next) {
    const status = err.status || 500
    res.status(status).json({ message: err.message })
}

module.exports = {
    users,
    validateUser,
    errorHandler
}