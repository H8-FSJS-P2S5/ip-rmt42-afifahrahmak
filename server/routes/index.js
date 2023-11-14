const RecipeController = require('../controllers/RecipeController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

const router = require('express').Router(); 


router.post("/register", UserController.register);   //register

router.post("/login", UserController.login);    //login

router.use(authentication)

router.get("/recipes", RecipeController.recipes); 

router.get("/recipes/:id", RecipeController.recipeById); 


// =============== DEVELOPMENT ====================
router.get("/recDB", RecipeController.getRecDb); 
router.get("/recDB/:id", RecipeController.getRecDbId); 
// ================================================

router.use(errorHandler);


module.exports = router;