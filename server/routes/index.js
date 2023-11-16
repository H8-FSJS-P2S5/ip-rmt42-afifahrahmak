const CommentController = require('../controllers/CommentController');
const MailController = require('../controllers/MailController');
const RecipeController = require('../controllers/RecipeController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router(); 


router.post("/register", UserController.register);   // REGISTER

router.post("/login", UserController.login);    // LOGIN 

router.post("/google-login", UserController.googleLogin);  //GOOGLE login


// ======================== Authentication START ============================

router.use(authentication)

router.get("/recipes", RecipeController.recipes); 

router.get("/recipe/:id", RecipeController.recipeById); 


// =======================================================

router.post("/contact-mail", MailController.sendMail); 


// ==================================== Comment ======================================

router.get("/comment", CommentController.getComment);   // POSTS

router.post("/comment/add", CommentController.addComment);  // ADD 

router.put("/comment/edit/:id", authorization, CommentController.editComment);  // EDIT

router.delete("/comment/delete/:id", authorization, CommentController.deleteComment);   // DELETE


router.use(errorHandler);


module.exports = router;