const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let user1 = {
    username: "Admin",
    email: "admin@email.com",
    password: "12345",
}

let user2 = {
    username: "staff",
    email: "staff@email.com",
    password: "12345",
}

let invalidToken = "eyJhbGciOiJIUzpXVC9.eyJpZCI6MSwiaWF0Ij1MDc0Q.A85Qn24V-jNwPqbAwPXFhcpVAClS0J78OS"
let tokenAdm;
let admin; 
let tokenStf;
let staff;

beforeAll(async () => {
    admin = await User.create(user1); 
    staff = await User.create(user2); 
    tokenAdm = signToken({id: admin.id});
    tokenStf = signToken({id: staff.id});

    const dateNow = new Date();

    await queryInterface.bulkInsert('Comments', [
        {
            "description": "Any",
            "userId": admin.id,
            "createdAt": dateNow,
            "updatedAt": dateNow
        },
        {
            "description": "Any",
            "userId": staff.id,
            "createdAt": dateNow,
            "updatedAt": dateNow
        }
    ])

})

let commentId = 1;
let comment = {
    "description": "Any",
    "userId": 1
}

describe("/comment/edit/:id", () => {

    //Berhasil mengupdate data Entitas berdasarkan params id yang diberikan
    test("success update cuisine by id (200)", async () => {
        let {status, body} = await request(app)
            .put(`/comment/edit/${commentId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(comment);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body.id).toBe(commentId);      
        expect(body).toHaveProperty("description", expect.any(String));   
        expect(body).toHaveProperty("userId", expect.any(Number));
        expect(body.userId).toBe(admin.id); 
    })


    // Gagal menjalankan fitur karena belum login 
    test("failed update cuisine because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .put(`/comment/edit/${commentId}`)
            .send(comment);

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed update cuisine with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .put(`/comment/edit/${commentId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(comment);

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("invalid token");
    })


    // Gagal karena id entity yang dikirim tidak terdapat di database
    test("failed update cuisine with invalid id (404)", async () => {
        const invalidId = 7;
        let {status, body} = await request(app)
            .put(`/comment/edit/${invalidId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(comment);

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Comment not found");
    })


    // Gagal menjalankan fitur ketika mengolah data entity yang bukan miliknya
    test("failed to updatesomeone's else comment (403)", async () => {
        let {status, body} = await request(app)
            .put(`/comment/edit/${commentId}`)
            .set("Authorization", `Bearer ${tokenStf}`)
            .send(comment);

        expect(status).toBe(403);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("You are not authorized");
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