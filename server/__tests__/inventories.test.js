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

    await queryInterface.bulkInsert("Inventories", [
        {
            UserId: 1,
            MusicId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            UserId: 1,
            MusicId: 2,
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

    await queryInterface.bulkDelete("Inventories", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true
    })
})

describe("/inventories", () => {
    test("Success get inventories data", async() => {
        let {status, body} = await request(app)
        .get("/inventories")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body[0]).toBeInstanceOf(Object)
    })

    test("Fail get inventories data (no token)", async() => {
        let {status, body} = await request(app)
        .get("/inventories")
        expect(status).toBe(401)
        expect(body.message).toBe("Unauthenticated")
    })

    test("Success delete inventories data", async() => {
        let {status, body} = await request(app)
        .delete("/inventories/2")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(200)
        expect(typeof body).toBe("string")
    })

    test("Fail delete inventories data (not found)", async() => {
        let {status, body} = await request(app)
        .delete("/inventories/10")
        .set("Authorization", `Bearer ${token}`)
        expect(status).toBe(404)
        expect(body.message).toBe("Data not found")
    })

    test("Fail delete inventories data (forbidden)", async() => {
        let {status, body} = await request(app)
        .delete("/inventories/1")
        .set("Authorization", `Bearer ${staffToken}`)
        expect(status).toBe(403)
        expect(body.message).toBe("You are not authorized")
    })

    test("Fail adding inventories (no orderId)", async() => {
        let {status, body} = await request(app)
        .post("/inventories/2")
        .set("Authorization", `Bearer ${staffToken}`)
        .send({
            orderId: "a"
        })
        expect(status).toBe(404)
        expect(body.message).toBe("Data not found")
    })
})