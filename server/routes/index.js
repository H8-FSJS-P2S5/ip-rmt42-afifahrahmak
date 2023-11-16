const express = require('express');
const HistoryController = require('../controllers/HistoryController');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const BookController = require('../controllers/BookController');
const MailController = require('../controllers/mails/MailController');
const router = express.Router();

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/login-google', UserController.loginGoogle);

// router.get('/users/leaderboards', authentication, UserController.getTopThree);
router.post('/mail', authentication, MailController.sendMail);
router.post('/histories', authentication, HistoryController.create);
// router.post('/histories/:bookId', authentication, HistoryController.create); //Klik card
router.get('/histories', authentication, HistoryController.getByUserId);
router.put('/histories/:historyId', authentication, HistoryController.updatePoin);
router.patch('/histories/:historyId/books/:bookId', authentication, HistoryController.updateBookId);
router.post('/books', authentication, BookController.findBook);
router.get('/books', authentication, BookController.getAll);
router.get('/books/:bookId', authentication, BookController.getById);
router.delete('/histories/:historyId', authentication, HistoryController.delete)
router.use(errorHandler.handler);

module.exports = router;