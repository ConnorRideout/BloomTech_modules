const request = require('supertest')
const bcrypt = require('bcryptjs')

const db = require('../data/db-config')
const server = require('./server')

describe('server tests', () => {
    describe('register', () => {
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert([
                { username: 'Billybob', password: bcrypt.hashSync('password123'), account_type: 'admin' },
                { username: 'Jeff', password: bcrypt.hashSync('secret321'), account_type: 'user' }
            ])
        })
        test('sending bad credentials fails', async () => {
            const body1 = { username: '', password: 'test123' }
            const body2 = { username: 'test' }
            const body3 = { password: 'asdf' }

            const res1 = await request(server)
                .post('/api/users/register')
                .send(body1)
            expect(res1.status).toBe(422)

            const res2 = await request(server)
                .post('/api/users/register')
                .send(body2)
            expect(res2.status).toBe(422)

            const res3 = await request(server)
                .post('/api/users/register')
                .send(body3)
            expect(res3.status).toBe(422)
        })
        test('sending good credentials responds with a new user', async () => {
            const body = { username: 'newguy', password: 'hithere' }

            const res = await request(server)
                .post('/api/users/register')
                .send(body)
            expect(res.status).toBe(201)
            expect(res.body.username).toBe('newguy')
        })
    })
    describe('login', () => {
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert([
                { username: 'Billybob', password: bcrypt.hashSync('password123'), account_type: 'admin' },
                { username: 'Jeff', password: bcrypt.hashSync('secret321'), account_type: 'user' }
            ])
        })
        test('sending incorrect credentials fails', async () => {
            const body1 = { username: 'asdfjkl;', password: 'test' }
            const body2 = { username: 'Billybob', password: 'incorrect' }

            const res1 = await request(server)
                .post('/api/users/login')
                .send(body1)
            expect(res1.status).toBe(401)

            const res2 = await request(server)
                .post('/api/users/login')
                .send(body2)
            expect(res2.status).toBe(401)
        })
        test('sending correct credentials responds with the correct message', async () => {
            const body = { username: 'Billybob', password: 'password123' }

            const res = await request(server)
                .post('/api/users/login')
                .send(body)
            expect(res.status).toBe(200)
            expect(res.body.message).toBe('Welcome back, Billybob!')
        })
    })
    describe('get users', () => {
        beforeEach(async () => {
            await db('users').truncate()
            await db('users').insert([
                { username: 'Billybob', password: bcrypt.hashSync('password123'), account_type: 'admin' },
                { username: 'Jeff', password: bcrypt.hashSync('secret321'), account_type: 'user' }
            ])
        })
        test('users are correctly gotten', async () => {
            const res = await request(server).get('/api/users/users')

            expect(res.body).toHaveLength(2)
        })
    })
})