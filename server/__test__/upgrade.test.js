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

let token
beforeAll( async () => {
    const user = await User.create(user2)
    await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
    token = signToken({id: user.id })
})

const id = 1

describe('upgrade user', () => {
    test('Succes add new user', async () => {
        let {status, body} = await request(app)
            .patch(`/upgrade/${id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('username', 'test2')
        expect(body).toHaveProperty('status', 'Immortal')
    })
})

afterAll( async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    
    await queryInterface.bulkDelete('Profiles', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})