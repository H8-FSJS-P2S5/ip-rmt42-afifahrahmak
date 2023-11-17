const app = require('../app')
const request = require('supertest')
const {sequelize, User, Profile, Category} = require('../models')
const { signToken } = require('../helper/jwt')
const {queryInterface} = sequelize

const user1 = {
    username: "test1",
    email: "test1@mail.com",
    password: "password"
}

const category1 = {
    name: "test"
}

const post1 = {
    title: "test post",
    description: "test description",
    CategoryId: 1,
    status: "Free"
}

const post2 = {
    description: "test description",
    CategoryId: 1,
    status: "Free"
}

const post3 = {
    title: "test post",
    CategoryId: 1,
    status: "Free"
}

let token
beforeAll( async () => {
    const user = await User.create(user1)
    await Category.create(category1)
    token = signToken({id: user.id })
})

describe('add-post', () => {
    test('Succes add new user', async () => {
        let {status, body} = await request(app)
            .post('/post/add')
            .send(post1)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
    })

    test('Error title required', async () => {
        const {status, body} = await request(app)
            .post('/post/add')
            .send(post2)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Title is required')
    })

    test('Error description required', async () => {
        const {status, body} = await request(app)
            .post('/post/add')
            .send(post3)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Description is required')
    })
})

afterAll( async () => {
    await queryInterface.bulkDelete('Posts', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})