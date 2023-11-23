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
    token = signToken({id: user1.id, email: user1.email,})
    staffToken = signToken({id: user2.id, email: user2.email})
    invalidToken = "eyJhbGciOiJIUz6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQANiRYsKR2otlu_EoqAmDSPow"

    await queryInterface.bulkInsert("MusicKits", [
        {
            name: "Hotline Miami",
            artist: "Various Artists",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: "I Am",
            artist: "AWOLNATION",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
})

afterAll(async() => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })

    await queryInterface.bulkDelete("MusicKits", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

describe("/musicKits", () => {
    test("Success get music kits data", async() => {
        let {status, body} = await request(app)
        .get("/musicKits")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body[0]).toBeInstanceOf(Object)
    })

    test("Fail get music kits data (no token)", async() => {
        let {status, body} = await request(app)
        .get("/musicKits")
        expect(status).toBe(401)
        expect(body.message).toBe("Unauthenticated")
    })

    test("Fail get music kits data (invalid token)", async() => {
        let {status, body} = await request(app)
        .get("/musicKits")
        .set("Authorization", `Bearer ${invalidToken}`)
        expect(status).toBe(401)
        expect(body.message).toBe("Unauthenticated")
    })

    test("Success get single music data", async() => {
        let {status, body} = await request(app)
        .get("/musicKits/1")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Object)
    })

    test("Fail get single music data (not found)", async() => {
        let {status, body} = await request(app)
        .get("/musicKits/10")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(404)
        expect(body.message).toBe("Data not found")
    })

    test("Fail get single music data (no token)", async() => {
        let {status, body} = await request(app)
        .get("/musicKits/1")
        expect(status).toBe(401)
        expect(body.message).toBe("Unauthenticated")
    })
})