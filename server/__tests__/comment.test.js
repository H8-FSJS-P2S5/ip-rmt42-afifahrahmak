const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let user1 = {
    username: "string",
    email: "admin@email.com",
    password: "12345"
}


let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let token;


beforeAll(async () => {
    let admin = await User.create(user1);
    token = signToken({id: admin.id});
    
    const dateNow = new Date();

    await queryInterface.bulkInsert('Comments', [
        {
            "imgUrl": "http://www.com",
            "username": "Any",
            "description": "Any",
            "userId": 1,
            "createdAt": dateNow,
            "updatedAt": dateNow,
        },
        {
            "imgUrl": "http://www.com",
            "username": "Any",
            "description": "Any",
            "userId": 1,
            "createdAt": dateNow,
            "updatedAt": dateNow,
        },
    ])

})


describe("/comment", () => {

    //Berhasil mendapatkan data entitas
    test("success get all comment (200)", async () => {
        let {status, body} = await request(app)
            .get("/comment")
            .set("Authorization", `Bearer ${token}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(Object);
        expect(body[0]).toHaveProperty("id", expect.any(Number));
        expect(body[0]).toHaveProperty("imgUrl", expect.any(String));;   
        expect(body[0]).toHaveProperty("username", expect.any(String));    
        expect(body[0]).toHaveProperty("description", expect.any(String));;   
        expect(body[0]).toHaveProperty("userId", expect.any(Number));
    })


    // Gagal menjalankan fitur karena belum login
    test("failed get all comment because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .get("/comment")

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed get all comment with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .get("/comment")
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("invalid token");
    })
})


afterAll(async () => {
    await queryInterface.bulkDelete("Comments",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

})