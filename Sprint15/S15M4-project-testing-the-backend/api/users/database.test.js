const db = require('../../data/db-config')
const bcrypt = require('bcryptjs')

const Users = require('./users-model')

// test.todo('no')
describe('users model', () => {
    describe('insert', () => {
        beforeEach(async () => {
            await db('users').truncate()
        })
        test('properly inserts a single record into the database', async () => {
            const user = { username: 'Tom', password: bcrypt.hashSync('test123'), account_type: 'admin' }
            const newUser = await Users.add(user)
            expect(newUser).toEqual({ user_id: 1, ...user })
        })
        test('properly inserts multiple records into the database', async () => {
            await Users.add({ username: 'Steve', password: bcrypt.hashSync('pass321'), account_type: 'admin' })
            await Users.add({ username: 'test', password: bcrypt.hashSync('abc123') })

            const users = await db('users')

            expect(users).toHaveLength(4)
        })
    })
    describe('find', () => {
        beforeEach(async () => {
            await db('users').truncate()
        })
        test('find properly gets users', async () => {
            await Users.add({ username: 'Steve', password: bcrypt.hashSync('pass321'), account_type: 'admin' })
            await Users.add({ username: 'test', password: bcrypt.hashSync('abc123') })

            const directUsers = await db('users')
            const users = await Users.find()

            expect(users).toEqual(directUsers)
        })
    })
})