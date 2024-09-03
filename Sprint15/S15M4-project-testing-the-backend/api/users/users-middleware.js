const bcrypt = require('bcryptjs')

const resp = (message, status = 422) => {
    return { status, message }
}

function checkValidBody(req, res, next) {
    let { username, password, account_type } = req.body
    if (!username || typeof username !== 'string' || !username.trim()) {
        next(resp("username is required and must be a string"))
    } else if (!password || typeof password !== 'string' || !password.trim()) {
        next(resp("password is required and must be a string"))
    } else if (account_type && (typeof account_type !== 'string' || !['admin', 'user'].includes(account_type.toLowerCase()))) {
        next(resp("account_type, if included, must be 'admin' or 'user' (default is 'user')"))
    } else {
        req.body.username = username.trim()
        req.body.password = bcrypt.hashSync(password)
        next()
    }
}

module.exports = {
    checkValidBody
}