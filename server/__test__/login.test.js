const app = require('../app')
const request = require('supertest')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize


let user1 = {
    username: 'test1',
    email: 'test1@mail.com',
    password: 'password'
}

let user2 = {
    username: 'test2',
    email: 'test2@mail.com',
    password: 'password'
}

beforeAll( async () => {
    await User.create(user1)
})

describe('login', () => {
    test('Success Login and Get Token ', async () => {
        let {status, body} = await request(app)
            .post('/login')
            .send(user1)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('access_token', expect.any(String))
    })

    test('Username is required', async () => {
        const {status, body} = await request(app)
            .post('/login')
            .send({
                password: 'password'
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is required')
    })

    test('Password is required', async () => {
        const {status, body} = await request(app)
            .post('/login')
            .send({
                email: 'test1@mail.com'
            })
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Password is required')
    })

    test('Invalid email or password', async () => {
        const {status, body} = await request(app)
            .post('/login')
            .send(user2)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Invalid username/password')
    })
})

afterAll( async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})