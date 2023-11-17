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


    const createUser1 = await User.create({ ...user1 });
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

describe('/mail', () => {
  describe('Positive Testing', () => {
    test('success send mail for book link', async () => {
      let { status, body } = await request(app)
        .post('/mail')
        .set("Authorization", `Bearer ${token1}`)
        .send({ historyId: 1 });

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
    }, timeOut);
  });

  describe('Negative Testing', () => {
    test('failed send mail for book link', async () => {
      let { status, body } = await request(app)
        .post('/mail')
        .set("Authorization", `Bearer ${token1}`)
        .send({ historyId: 999 });

      expect(status).toBe(500);
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
  await queryInterface.bulkDelete('Books', null, {
    truncate: true,
    cascade: true,
    restartIdentity: true
  });
});