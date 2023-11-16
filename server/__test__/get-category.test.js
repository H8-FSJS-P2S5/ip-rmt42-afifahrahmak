const app = require('../app')
const request = require('supertest')
const {sequelize, User, Category} = require('../models')
const { signToken } = require('../helper/jwt')
const {queryInterface} = sequelize

const user2 = {
    username: "test2",
    email: "test2@mail.com",
    password: "password"
}

const category = {
    name: "test"
}

let token
beforeAll( async () => {
    const user = await User.create(user2)
    await Category.create(category)
    token = signToken({id: user.id })
})

describe('add-category', () => {
    test('succes get category', async () => {
        let {status, body} = await request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body[0]).toHaveProperty('id', expect.any(Number))
    })
})

afterAll( async () => {
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