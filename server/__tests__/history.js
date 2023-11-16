const app = require('../app');
const request = require('supertest');
const { User, sequelize, Book } = require('../models');
const { createToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

const user1 = {
  username: "usrOne",
  email: "user1@gmail.com",
  password: '11111',
  name: 'User 1',
  accountType: 'manual'
};

const timeOut = 40000;

let token1;
beforeAll(async () => {
  try {
    let booksJson = require('../jsons/books.json');
    booksJson = booksJson.map(book => {
      book.createdAt = book.updatedAt = new Date();
       return book;
    });
  
    await queryInterface.bulkInsert('Books', booksJson);
    
    
    const createUser1 = await User.create({...user1});
    const now = new Date();
    await queryInterface.bulkInsert('Histories', [{
      userId: 1,
      bookId: 1,
      question: 'Apakah JavaScript merupakan bahasa pemrograman?;;Apakah ReactJS merupakan library JavaScript?;;Apakah ExpressJS merupakan framework JavaScript?;;Apakah JavaScript dapat digunakan baik di sisi client maupun server?;;Apakah ReactJS dapat digunakan untuk mengembangkan aplikasi web?',
      answer: "Ya;;Ya;;Ya;;Ya;;Ya",
      point: 100,
      status: 'unpaid',
      createdAt: now,
      updatedAt: now
    }]);

    token1 = createToken({ id: createUser1.id });
    
  } catch (error) {
    console.log(error);
  }
}, timeOut);

describe('/histories', () => {
  describe('Positive Testing', () => {
    test('success create history with undefined book Id', async () => {
      let { status, body } = await request(app)
        .post('/histories')
        .set("Authorization", `Bearer ${token1}`);

      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("messages", "Successfully create history");
      expect(body).toHaveProperty("data");
    }, timeOut);

    test('success create history with defined book Id', async () => {
      let { status, body } = await request(app)
        .post('/histories')
        .set("Authorization", `Bearer ${token1}`)
        .send({bookId : 1});

      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("messages", "Successfully create history");
      expect(body).toHaveProperty("data");
    }, timeOut);
  });

  describe('Negative Testing', () => {
    test('failed create history with unknown bookId', async () => {
      let { status, body } = await request(app)
        .post('/histories')
        .set("Authorization", `Bearer ${token1}`)
        .send({bookId : 99999999});

      expect(status).toBe(500);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Internal Server Error");
    }, timeOut);

  });
});

describe('/histories/:historyId', () => {
  describe('Positive Testing', () => {
    test('success update poin', async () => {
      let { status, body } = await request(app)
        .put('/histories/2')
        .set("Authorization", `Bearer ${token1}`)
        .send({answer : ['ya', 'ya', 'ya', 'ya', 'ya']});

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("messages", "Successfully get point");
      expect(body).toHaveProperty("data");
    }, timeOut);

    test('success update book Id', async () => {
      let { status, body } = await request(app)
        .patch('/histories/2/books/2')
        .set("Authorization", `Bearer ${token1}`)
        .send({bookId : 2, historyId: 2});

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("messages", "Successfully update book");
    }, timeOut);

    test('success get history by user Id', async () => {
      let { status, body } = await request(app)
        .get('/histories')
        .set("Authorization", `Bearer ${token1}`);

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
    }, timeOut);

    test('success delete history history id', async () => {
      let { status, body } = await request(app)
        .delete('/histories/1')
        .set("Authorization", `Bearer ${token1}`);

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
    }, timeOut);
  });

  describe('Negative Testing', () => {
    test('failed create history with unknown bookId', async () => {
      let { status, body } = await request(app)
        .post('/histories')
        .set("Authorization", `Bearer ${token1}`)
        .send({bookId : 99999999});

      expect(status).toBe(500);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("message", "Internal Server Error");
    }, timeOut);

    test('success update book Id but the book id has been exists', async () => {
      let { status, body } = await request(app)
        .patch('/histories/2/books/1')
        .set("Authorization", `Bearer ${token1}`)
        .send({bookId : 2, historyId: 1});

      expect(status).toBe(400);
      expect(body).toBeInstanceOf(Object);
    }, timeOut);

  });
});


afterAll(async () => {
  await queryInterface.bulkDelete('Histories', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
  await queryInterface.bulkDelete('Users', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
});