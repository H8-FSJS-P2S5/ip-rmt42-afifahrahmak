const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

const user1 = {
    email: "admin@email.com",
    password: "12345" 
}

const user2 = {
    email: "staff@email.com",
    password: "12345"
}


beforeAll(async () => {
    await User.create(user1);
})

describe("/login", () => {

    //Berhasil login dan diberikan access token
    test("success login and get access token", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send(user1);

        console.log(status, body);
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));    
    })


    //Email tidak diberikan / tidak diinput
    test("failed login without email", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "",
                password: "12345678" 
            });  

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Error invalid email or Password");
    })


    //Password tidak diberikan / tidak diinput
    test("failed login without password", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "admin@email.com",
                password: "" 
            });  

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Error invalid email or Password");
    })


    // Email diberikan invalid / tidak terdaftar
    test("failed login with invalid email", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send(user2);

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("User not found or Password not matched");
    })
    
    
    // Password diberikan salah / tidak match
    test("failed login with invalid password", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "admin@email.com",
                password: "09876" 
            });

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("User not found or Password not matched");
    })

})


afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})