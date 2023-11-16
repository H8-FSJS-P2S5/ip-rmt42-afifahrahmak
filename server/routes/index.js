const express = require("express");
const UserController = require("../controllers/UserController");
const MainController = require("../controllers/MainController");
const router = express.Router();


//User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.googleLogin);

//agents
router.get("/agents", MainController.fetchAgents);


//bundle
router.get("/bundles", MainController.fetchBundles);



module.exports = router