const express = require('express');
const HistoryController = require('../controllers/HistoryController');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.post('/register', UserController.create);
router.post('/login', UserController.login);

router.get('/questions', HistoryController.create); 
router.put('/questions', HistoryController.update); 
router.use(errorHandler.handler);

module.exports = router;