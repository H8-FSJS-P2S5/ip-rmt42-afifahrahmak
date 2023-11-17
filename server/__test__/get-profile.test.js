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

describe('get-profil', () => {
    test('Succes add new user', async () => {
        let {status, body} = await request(app)
            .get(`/profile/${user2.username}`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('UserId', expect.any(Number))
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