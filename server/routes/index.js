const MailController = require('../controllers/MailController');
const RecipeController = require('../controllers/RecipeController');
const UserController = require('../controllers/UserController');
const CommentController = require('../controllers/CommentController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router(); 


router.post("/register", UserController.register);   //register

router.post("/login", UserController.login);    //login

router.post("/google-login", UserController.googleLogin);  //GOOGLE LOGIN


// ======================== Authentication START ============================

router.use(authentication)

router.get("/recipes", RecipeController.recipes); 

router.get("/recipe/:id", RecipeController.recipeById); 

router.post("/contact-mail", MailController.sendMail); 


// ==================================== Comment ======================================

router.post("/comment/add", CommentController.addComment); 

router.put("/comment/edit/:id", authorization, CommentController.editComment);  

router.delete("/comment/delete/:id", authorization, CommentController.deleteComment); 


router.use(errorHandler);


module.exports = router;