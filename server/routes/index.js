const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router(); 

router.post("/login", UserController.login);    //login

router.post("/register", UserController.register);   //register

router.use(authentication)


router.use(errorHandler);


module.exports = router;