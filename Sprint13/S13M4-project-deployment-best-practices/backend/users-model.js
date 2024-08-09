const { users } = require('./middleware')

let curId = 1
const getNextId = () => {
    curId++
    return curId
}

const getUsers = () => {
    return users
}

const registerUser = (user) => {
    user.id = getNextId()
    users.push(user)
    return user
}

const loginUser = ({ username, password }) => {
    const user = users.find(u => u.username == username)
    if (user && user.password === password) {
        return { status: 200, message: `Login successful. Welcome back, ${username}!` }
    } else {
        return { status: 404, message: "Login failed: username or password incorrect, or you're not registered" }
    }
}

module.exports = {
    getUsers,
    registerUser,
    loginUser
}