const db = require('../../data/db-config')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .first()
}

function add(user) {
    return db('users')
        .insert(user)
        .then(([user_id]) => {
            return findBy({ user_id })
        })
}

module.exports = {
    find,
    findBy,
    add
}