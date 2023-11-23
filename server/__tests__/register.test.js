const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

let seed_user1 = {
    username: "Rara",
    email: "rara@email.com",
    password: "12345"
}

const user2 = {
    email: "staff@mail.com",
    password: "12345"
}

beforeAll(async () => {
    await User.create(seed_user1);
})

describe("/register", () => {

    // Berhasil register
    test("success register new user", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send(user2);

        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("username", expect.any(String));
    })

    
    //Email tidak diberikan / tidak diinput
    test("failed register when email is null", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })

    
    //Password tidak diberikan / tidak diinput
    test("failed register when password is null", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                email: "staff@mail.com",
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    

    //Email diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                email: "",
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })


    //Password diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                email: "staff@mail.com",
                password: ""
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    
    
    //Email sudah terdaftar
    test("failed register with duplicate email (400)", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                email: seed_user1.email,
                password: seed_user1.password
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("email must be unique");
    })

    
    //Format Email salah / invalid
    test("failed register with invalid email format", async () => {
        let {status, body} = await request(app)
            .post("/register")
            .send({
                email: "staffmailcom",
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email should be written in email format!");
    })

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})