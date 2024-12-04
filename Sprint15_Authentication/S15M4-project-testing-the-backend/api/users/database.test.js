const db = require('../../data/db-config')
const bcrypt = require('bcryptjs')

const Users = require('./users-model')

// test.todo('no')
describe('users model', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    describe('insert', () => {
        test('properly inserts a single record into the database', async () => {
            const user = { username: 'Tom', password: bcrypt.hashSync('test123'), account_type: 'admin' }
            const newUser = await Users.add(user)
            expect(newUser).toEqual({ user_id: 1, ...user })
        })
        test('properly inserts multiple records into the database', async () => {
            await Users.add({ username: 'Steve', password: bcrypt.hashSync('pass321'), account_type: 'admin' })
            await Users.add({ username: 'test', password: bcrypt.hashSync('abc123') })

            const users = await db('users')

            expect(users).toHaveLength(2)
        })
    })
    describe('find', () => {
        test('find properly gets users', async () => {
            await Users.add({ username: 'Steve', password: bcrypt.hashSync('pass321'), account_type: 'admin' })
            await Users.add({ username: 'test', password: bcrypt.hashSync('abc123') })

            const directUsers = await db('users')
            const users = await Users.find()

            expect(users).toEqual(directUsers)
        })
    })
    describe('findBy', () => {
        beforeEach(async () => {
            await db('users').truncate()
            await Users.add({ username: 'Steve', password: bcrypt.hashSync('pass321'), account_type: 'admin' })
            await Users.add({ username: 'test', password: bcrypt.hashSync('abc123') })
        })
        test('findBy user_id', async () => {
            const user = await Users.findBy({ user_id: 2 })
            expect(user.username).toBe('test')
        })
        test('findBy username', async () => {
            const user = await Users.findBy({ username: 'Steve' })
            expect(user.account_type).toBe('admin')
        })
    })
})