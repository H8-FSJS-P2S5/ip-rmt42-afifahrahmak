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

describe('/books', () => {
  describe('Positive Testing', () => {
    test('success get all books', async () => {
      let { status, body } = await request(app)
        .get('/books')
        .set("Authorization", `Bearer ${token1}`);

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("books");
    }, timeOut);
     
    test('success findbook by description', async () => {
      let { status, body } = await request(app)
        .post('/books')
        .set("Authorization", `Bearer ${token1}`)
        .send({desc : 'saya ingin buku yang berjudul mantappu jiwa dari jerome polin'});

      expect(status).toBe(201);
      expect(body).toBeInstanceOf(Object);
      expect(body).toHaveProperty("data");
    }, timeOut);

    test('success get book by book id', async () => {
      let { status, body } = await request(app)
        .get('/books/1')
        .set("Authorization", `Bearer ${token1}`);

      expect(status).toBe(200);
      expect(body).toBeInstanceOf(Object);
    }, timeOut);
  });

  describe('Negative Testing', () => {
    // test('failed create history with unknown bookId', async () => {
    //   let { status, body } = await request(app)
    //     .post('/histories')
    //     .set("Authorization", `Bearer ${token1}`)
    //     .send({bookId : 99999999});

    //   expect(status).toBe(500);
    //   expect(body).toBeInstanceOf(Object);
    //   expect(body).toHaveProperty("message", "Internal Server Error");
    // }, timeOut);

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