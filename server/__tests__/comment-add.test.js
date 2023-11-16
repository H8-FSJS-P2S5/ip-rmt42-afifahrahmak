const app = require('../app');
const request = require("supertest");
const { sequelize, User, Category } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let user1 = {
    username: "Admin",
    email: "admin@email.com",
    password: "12345",
}

let invalidToken = "eyJhbGciOiJIUzpXVC9.eyJpZCI6MSwiaWF0Ij1MDc0Q.A85Qn24V-jNwPqbAwPXFhcpVAClS0J78OS"
let tokenAdm;
let admin; 
let comment;

beforeAll(async () => {
    admin = await User.create(user1);
    tokenAdm = signToken({id: admin.id});

    comment = {
        "description": "Any",
        "userId": admin.id,
    }
})


describe("/comment/add", () => {

      //Berhasil membuat entitas baru
      test("success creating new comment", async () => {
        let {status, body} = await request(app)
            .post("/comment/add")
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(comment);

        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));      
        expect(body).toHaveProperty("description", expect.any(String));;   
        expect(body).toHaveProperty("userId", expect.any(Number));
    })
    
    //Gagal menjalankan fitur karena belum login
    test("failed because not login yet", async () => {
        let {status, body} = await request(app)
            .post("/comment/add")
            .send(comment);

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));    
        expect(body.message).toContain("Unauthenticated");    
    })

        
    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed because invalid token", async () => {
        let {status, body} = await request(app)
            .post("/comment/add")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(comment);

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
