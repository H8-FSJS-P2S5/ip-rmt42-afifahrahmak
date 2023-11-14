const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const router = express.Router()

// define the home page route
router.get('/', async(req, res) => {
  await res.send('ROUTER CHECK COMPLETE')
})

//User routes
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/googleLogin", UserController.googleLogin)

router.use(errorHandler)

module.exports = router