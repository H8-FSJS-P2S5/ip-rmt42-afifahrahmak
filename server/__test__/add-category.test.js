const app = require('../app')
const request = require('supertest')
const {sequelize, User, Profile} = require('../models')
const { signToken } = require('../helper/jwt')
const {queryInterface} = sequelize

const user2 = {
    username: "test2",
    email: "test2@mail.com",
    password: "password"
}

const category1 = {
    name: "test"
}

const category2 = {

}
const category3 = {
    name: ''
}

let token
beforeAll( async () => {
    const user = await User.create(user2)
    token = signToken({id: user.id })
})

describe('add-category', () => {
    test('succes add category', async () => {
        let {status, body} = await request(app)
            .post('/category/add')
            .set('Authorization', `Bearer ${token}`)
            .send(category1)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', `${category1.name}`)
    })

    test('Error name required', async () => {
        const {status, body} = await request(app)
            .post('/category/add')
            .set('Authorization', `Bearer ${token}`)
            .send(category2)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Name is required')
    })

    test('Error name required no string', async () => {
        const {status, body} = await request(app)
            .post('/category/add')
            .set('Authorization', `Bearer ${token}`)
            .send(category3)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Name is required')
    })
})

afterAll( async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})