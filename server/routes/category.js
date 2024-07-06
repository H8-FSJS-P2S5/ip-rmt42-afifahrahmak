const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandle');
const CategoryController = require('../controllers/categoryController');
const authentication = require('../middlewares/authentication');
const { authorizationAdmin } = require('../middlewares/authorization');
router.post('/categories', authentication, authorizationAdmin ,CategoryController.createCategory);
router.get('/categories', CategoryController.getAllCategory);


router.use(errorHandler)
module.exports = router;