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

const profile1 = {
    displayName: "test2test",
    firstName: "test2",
    imgUrl: 'image',
}

const profile2 = {
    displayName: "test2test",
    firstName: "",
    imgUrl: 'image',
}

const profile3 = {
    displayName: "",
    firstName: "asdasd",
    imgUrl: 'image',
}


let token
beforeAll( async () => {
    const user = await User.create(user2)
    await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
    token = signToken({id: user.id })
})

const random = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk4ODM3NTI5fQ.uPI6YV-FkQr0NujKVyubKYEWg93Gnz8VbotE5-7IG8Q'

describe('edit-profile', () => {
    test('Succes edit profile', async () => {
        let {status, body} = await request(app)
            .put(`/profile/${user2.username}/edit`)
            .send(profile1)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
    })

    test('Succes error firstName require', async () => {
        let {status, body} = await request(app)
            .put(`/profile/${user2.username}/edit`)
            .send(profile2)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'First Name is required')
    })

    test('Succes error display name require', async () => {
        let {status, body} = await request(app)
            .put(`/profile/${user2.username}/edit`)
            .send(profile3)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(400)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Display Name is required')
    })

    test('Succes error error token', async () => {
        let {status, body} = await request(app)
            .put(`/profile/${user2.username}/edit`)
            .send(profile1)
            .set('Authorization', `Bearer ${random}`)
        expect(status).toBe(401)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'You are unauthenticated')
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