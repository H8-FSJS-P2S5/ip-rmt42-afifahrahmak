const express = require('express');
const HistoryController = require('../controllers/HistoryController');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const BookController = require('../controllers/BookController');
const router = express.Router();

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/login-google', UserController.loginGoogle);

router.get('/users/leaderboards', authentication, UserController.getTopThree);
router.post('/histories', authentication, HistoryController.create); //Klik tombol main game
router.post('/histories/:bookId', authentication, HistoryController.create); //Klik card
router.put('/histories/:historyId', authentication, HistoryController.updatePoin);
router.patch('/histories/:historyId/books/:bookId', authentication, HistoryController.updateBookId);
router.post('/books', authentication, BookController.findBook);
router.get('/books/:bookId', authentication, BookController.getById);
router.delete('/books/:bookId', authentication, authorization.AdminOnly, BookController.delete)
router.use(errorHandler.handler);

module.exports = router;