const app = require('../app')
const request = require('supertest')
const {sequelize, User, Post, Profile, Category, Comment} = require('../models')
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

const comment = {
    comment: "by 1 kita bang",
    PostId: 1,
    UserId:1
}


let token
beforeAll( async () => {
    const user = await User.create(user1)
    await Profile.create({ displayName: user.username, firstName: user.username, status: user.status, UserId: user.id })
    await Category.create(category1)
    await Post.create(post1)
    await Comment.create(comment)
    token = signToken({id: user.id })
})

describe('add-comment', () => {
    test('Succes delete comment', async () => {
        let {status, body} = await request(app)
            .delete(`/post/1/comment/1`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Delete success')
    })

    test('Succes delete comment', async () => {
        let {status, body} = await request(app)
            .delete(`/post/1/comment/3`)
            .set('Authorization', `Bearer ${token}`)
        expect(status).toBe(404)
        expect(body).toBeInstanceOf(Object)
        expect(body).toHaveProperty('message', 'Comment not found')
    })
    
})

afterAll( async () => {
    await queryInterface.bulkDelete('Comments', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

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