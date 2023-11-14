const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const MusicKitController = require('../controllers/MusicKitController')
const authorization = require('../middlewares/authorization')
const InventoryController = require('../controllers/InventoryController')
const router = express.Router()

// define the home page route
router.get('/', async(req, res) => {
  await res.send('ROUTER CHECK COMPLETE')
})

//User routes
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/googleLogin", UserController.googleLogin)

//AUTHENTICATION
router.use(authentication)

//MusicKit routes
router.get("/musicKits", MusicKitController.getMusicKits)
router.get("/musicKits/:id", MusicKitController.getMusicKitId)

//Inventory routes
router.get("/inventories", InventoryController.getInventories)
router.post("/inventories/:id", InventoryController.postInventory)

router.use(errorHandler)

module.exports = router