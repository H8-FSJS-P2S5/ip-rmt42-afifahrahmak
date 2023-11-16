const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let user = {
    username: "string",
    email: "admin@email.com",
    password: "12345"
}

let invalidToken = "eyJhbGciOiJIUzI1NiInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODMDc0Q.A8n24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let tokenAdm;
let admin;

beforeAll(async () => {
    admin = await User.create(user);
    tokenAdm = signToken({ id: admin.id });

    const dateNow = new Date();

    await queryInterface.bulkInsert('Recipes', [
        {
            "number": 1,
            "id": "133fcdec-4595-44be-a302-02df4c209451",
            "name": "Keto Sesame Tuna and Egg Salad",
            "description": "This quick and easy tuna and egg salad is combined with aromatic scallions and parsley and coated in a sesame, lemon mayo.\n\nThis is a great option for stuffing lettuce wraps or topping low carb crackers.",
            "prepareTime": "8 minutes",
            "cookTime": "0 minutes",
            "ingredients": [
                "Hard Boiled Egg 2 medium",
                "Scallions 2 medium - 4 1/8\" long",
                "Canned Tuna 1-¾ ounce",
                "Lemon Juice, Fresh 1 teaspoon",
                "Parsley, Fresh 1 tablespoon",
                "Sesame Oil 1 teaspoon",
                "Mayonnaise 1 tablespoon",
                "Sesame Seeds, Hulled, Toasted, Unsalted 1 teaspoon, whole pieces",
                "Salt, Sea Salt ⅛ teaspoon",
                "Black Pepper ⅛ teaspoon"
            ],
            "steps": [
                "Peel and roughly chop the eggs and add to a mixing bowl.",
                "Thinly slice the scallions and roughly chop the parsley. Add to the mixing bowl along with the tuna and stir well to combine.",
                "Add the mayonnaise to a mixing bowl with the lemon juice, sesame oil, salt and pepper. Whisk together until smooth.",
                "Spoon the dressing over the salad and stir well to coat.",
                "Sprinkle over the sesame seeds to serve."
            ],
            "nutrients": {
                "caloriesKCal": 170.313,
                "totalCarbs": 2.366,
                "sugar": 1.166,
                "protein": 11.004,
                "fat": 13.018,
                "cholesterol": 175.938,
                "alcohol": 0,
                "gluten": 0
            },
            "image": "https://tinyurl.com/2p82zzca/133fcdec-4595-44be-a302-02df4c209451.png",
            "createdAt": dateNow,
            "updatedAt": dateNow,
        },
        {
            "number": 2,
            "id": "ccef957b-351f-4c14-b33c-ef050045b877",
            "name": "Keto Vanilla Butter Latte",
            "description": "This creamy Keto vanilla BULLETPROOF® coffee recipe is rich in fats, frothy plant-based milk, and a hint of sweet vanilla. This Keto vanilla butter coffee makes a great fat-fueled breakfast option to kickstart your day. Alternatively, this is perfect served with a slice of low-carb cake as an afternoon treat!\n\n### What ingredients are in this Keto vanilla butter latte?\n\nThis Keto vanilla BULLETPROOF® coffee is prepared with hot almond milk infused with sweet vanilla extract. The milk is then blended with instant coffee and a hearty helping of unsalted butter, before being blitzed until super frothy! We have used a handheld stick blender to froth and blend our Keto coffee, however, you may use a freestanding blender for this if preferred.\n\n### Here are some tips to make Keto vanilla butter coffee?\n\nThis Keto BULLETPROOF® coffee provides a generous serving of fats from unsalted butter. If preferred you may swap the butter for coconut oil or BULLETPROOF® brain octane oil (MCT Oil) or even a blend of fats. You may also swap the erythritol for your preference in low-carb sweetener or omit it entirely if desired. Please be sure to adjust your macros for any changes made.\n\n### Can you use freshly brewed coffee in this Keto recipe?\n\nWhile this recipe calls for instant coffee, you can definitely substitute it for espresso or freshly brewed coffee, just make sure its strong.\n\nBULLETPROOF® is a registered trademark owned by Bulletproof Digital, Inc.",
            "prepareTime": "8 minutes",
            "cookTime": "3 minutes",
            "ingredients": [
                "Butter, Unsalted 1-½ tablespoon",
                "Almond Milk, Vanilla Or Other Flavors, Unsweetened 1-½ cup",
                "Instant Coffee 1 teaspoon",
                "Vanilla Extract ¼ teaspoon",
                "100% Pure Erythritol by Now 1 tsp"
            ],
            "steps": [
                "Add the almond milk and vanilla extract to a small saucepan over low/medium heat. Stir to combine. Heat the milk through until piping hot but not boiling.",
                "Add the instant coffee to a large mug. Add the granulated sweetener. Add the hot milk and stir well to combine, dissolving the coffee and sweetener.",
                "Add the butter to the mug. Stir well to combine. Let the butter completely melt into the milky coffee.",
                "Carefully use a hand held stick blender or milk frother and blend the coffee and butter. Continue blending until you have a thick frothy layer on the top of your coffee. Serve hot."
            ],
            "nutrients": {
                "caloriesKCal": 203.555,
                "totalCarbs": 5.903,
                "sugar": 0.572,
                "protein": 1.779,
                "fat": 21.015,
                "cholesterol": 45.755,
                "alcohol": 0.631,
                "gluten": 0
            },
            "image": "https://tinyurl.com/2p82zzca/ccef957b-351f-4c14-b33c-ef050045b877.png",
            "createdAt": dateNow,
            "updatedAt": dateNow,
        }])

})


const validId = "7631d8cb-2973-4f7c-833b-daeb4190c278";

describe("/recipe/:id", () => {

    //Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
    test("success get one recipe by id (200)", async () => {
        let { status, body } = await request(app)
            .get(`/recipe/${validId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id");
        expect(body.id).toBe(validId);
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("prepareTime", expect.any(String));
        expect(body).toHaveProperty("cookTime", expect.any(String));

        expect(body).toHaveProperty("ingredients");
        expect(body.ingredients).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(String);

        expect(body).toHaveProperty("steps");
        expect(body.steps).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(String);

        expect(body).toHaveProperty("nutrients");
        expect(body.nutrients).toBeInstanceOf(Object);

        expect(body).toHaveProperty("image", expect.any(String));
    })


    // Gagal menjalankan fitur karena belum login 
    test("failed get one recipe because not login yet (401)", async () => {
        let { status, body } = await request(app)
            .get(`/recipe/${validId}`)

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Unauthenticated");
    })


    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed get one recipe with invalid token (401)", async () => {
        let { status, body } = await request(app)
            .get(`/recipe/${validId}`)
            .set("Authorization", `Bearer ${invalidToken}`)

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("invalid token");
    })

    // Gagal mendapatkan Entitas Utama karena params id yang diberikan invalid
    test("failed get recipe with invalid id (404)", async () => {
        const invalidId = "7631d8cb-2973";
        let { status, body } = await request(app)
            .get(`/recipe/${invalidId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Recipe not found");
    })
})


afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Recipes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

})