const app = require("../app");
const request = require("supertest")
const { User, sequelize } = require("../models");
const { signToken, verifyToken } = require("../helpers/jwt");
const { queryInterface } = sequelize
const fs = require("fs")

let admin = {email: "admin@gmail.com", password: "admin"}
let staff1 = {email: "staff1@gmail.com", password: "staff1"}

beforeAll(async () => {
    let user1 = await User.create(admin)
    let user2 = await User.create(staff1)
})


describe("/register", () => {
    test("Success register", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "direwolf@gmail.com",
            password: "direwolf"
        })
        expect(status).toBe(201)
        expect(typeof body).toBe("string")
    })

    test("Fail register (no email)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            password: "goodboi"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Email is required")
    })

    test("Fail register (no password)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "goodboi@gmail.com"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Password is required")
    })

    test("Fail register (empty email)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "",
            password: "goodboi"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Email is required")
    })

    test("Fail register (empty password)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "goodboi@gmail.com",
            password: ""
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Password is required")
    })

    test("Fail register (existing email)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "admin@gmail.com",
            password: "admin"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Email must be unique")
    })

    test("Fail register (existing email)", async() => {
        let {status, body} = await request(app)
        .post("/register")
        .send({
            email: "filthyOrcs",
            password: "orcsOrcsOrcs"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Must follows email format")
    })
})

describe("/login", () => {
    test("Success login", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "direwolf@gmail.com",
            password: "direwolf"
        })
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
    })

    test("Fail login (no email)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            password: "direwolf"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Email is required")
    })

    test("Fail login (no password)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "direwolf@gmail.com"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Password is required")
    })

    test("Fail login (empty email)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "",
            password: "direwolf"
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Email is required")
    })

    test("Fail login (empty password)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "direwolf@gmail.com",
            password: ""
        })
        expect(status).toBe(400)
        expect(body.message).toBe("Password is required")
    })

    test("Fail login (wrong password)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "direwolf@gmail.com",
            password: "woofwoof"
        })
        expect(status).toBe(401)
        expect(body.message).toBe("Invalid email or password")
    })

    test("Fail login (wrong email)", async() => {
        let {status, body} = await request(app)
        .post("/login")
        .send({
            email: "wolfie@gmail.com",
            password: "direwolf"
        })
        expect(status).toBe(401)
        expect(body.message).toBe("Invalid email or password")
    })

    test("Fail google login (wrong email)", async() => {
        let {status, body} = await request(app)
        .post("/auth/googleLogin")
        expect(status).toBe(500)
        expect(body.message).toBe("Internal server error")
    })
})

afterAll(async() => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})