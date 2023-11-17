const app = require('../app')
const request = require('supertest')
const {sequelize, User, Post, Profile, Category} = require('../models')
const { signToken } = require('../helper/jwt')
const {queryInterface} = sequelize


const user1 = {
    username: "test1",
    email: "test1@mail.com",
    password: "password",
    status: "Free"
}

const category1 = {
    name: "test"
}

const post1 = {
    title: "test post",
    description: "test description",
    CategoryId: 1,
    status: 'Free',
    UserId: 1
}

let token
beforeAll( async () => {
    const user = await User.create(user1)
    await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
    await Category.create(category1)
    await Post.create(post1)
    token = signToken({id: user.id })
})

describe('detail-post', () => {
    test('Succes get detail post', async () => {
        let {status, body} = await request(app)
            .get(`/post/1`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
    })

    test('Succes get detail post', async () => {
        let {status, body} = await request(app)
            .get(`/post/10`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Post not found')
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

    await queryInterface.bulkDelete('Profiles', null, {
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