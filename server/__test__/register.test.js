const app = require('../app')
const request = require('supertest')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize


const user1 = {
    username: "test1",
    email: "test1@mail.com",
    password: "password"
}

const user2 = {
    username: "test2",
    email: "test2@mail.com",
    password: "password"
}

const user4 = {
    email: "test1@mail.com",
    password: "password"
}

const user5 = {
    username: "test3",
    password: "password"
}

const user6 = {
    username: "test3",
    email: "test1@mail.com"
}

const user3 = {
    username: "test3",
    email: "test2@mail.com",
    password: "password"
}

const user35 = {
    username: "test2",
    email: "test1@mail.com",
    password: "password"
}

const user7 = {
    username: "test3",
    email: "test1@mail.com",
    password: "test"
}

const user8 = {
    username: "test3",
    email: "",
    password: "password"
}

const user9 = {
    username: "test3",
    email: "1@mail.com",
    password: ""
}
const user10 = {
    username: "test3",
    email: "test10",
    password: "password"
}

beforeAll( async () => {
    const user = await User.create(user2)
})

describe('register', () => {
    test('Succes add new user', async () => {
        let {status, body} = await request(app)
            .post('/register')
            .send(user1)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('username', 'test1')
        expect(body).toHaveProperty('email', 'test1@mail.com')
    })

    test('Error username required', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user4)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Username is required')
    })

    test('Error email required', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user5)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is required')
    })

    test('Error password required', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user6)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Password is required')
    })

    test('Error duplicate email', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user3)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email already exist')
    })

    test('Error duplicate email', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user35)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Username already exist')
    })

    test('Error password length', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user7)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Password at least 8 character')
    })

    test('Error email empty string', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user8)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Email is required')
    })

    test('Error password empty string', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user9)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Password is required')
    })

    test('Error email empty string', async () => {
        const {status, body} = await request(app)
            .post('/register')
            .send(user10)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Invalid email format')
    })
})

afterAll( async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})