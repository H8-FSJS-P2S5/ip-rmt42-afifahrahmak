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

const postUpdate = {
    title: "test post update",
    description: "test description update",
}

let token
beforeAll( async () => {
    const user = await User.create(user1)
    await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
    await Category.create(category1)
    await Post.create(post1)
    token = signToken({id: user.id })
})

describe('edit-post', () => {
    test('Succes edit post', async () => {
        let {status, body} = await request(app)
            .put(`/post/1/edit`)
            .set('Authorization', `Bearer ${token}`)
            .send(postUpdate)
        expect(status).toBe(201)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('id', expect.any(Number))
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