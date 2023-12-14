const express = require('express')
const UserController = require('../controllers/UserController')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const MusicKitController = require('../controllers/MusicKitController')
const authorization = require('../middlewares/authorization')
const InventoryController = require('../controllers/InventoryController')
const router = express.Router()
const passport = require("passport");
const jwt = require("jsonwebtoken");
const PaymentController = require('../controllers/PaymentController')

// define the home page route
router.get('/', async(req, res) => {
  await res.send('ROUTER CHECK COMPLETE')
})

//User routes
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/auth/googleLogin", UserController.googleLogin)

router.get("/auth/steam", passport.authenticate("steam"));

router.get("/auth/steam/return",
  passport.authenticate("steam", {
    successRedirect: 'http://localhost:5173/home',
    failureRedirect: '/login'
  }),
  (req, res) => {
    console.log("IN RETURN")
    const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.send(`<script>window.opener.postMessage({ token: '${token}', ok: true }, 'http://localhost:5173'); window.close();</script>`);
    res.render("authenticated", {
      jwtToken: token,
      clientUrl: "http://localhost:5173",
    });
  },
);

//AUTHENTICATION
router.use(authentication)

//MusicKit routes
router.get("/musicKits", MusicKitController.getMusicKits)
router.get("/musicKits/:id", MusicKitController.getMusicKitId)

//Inventory routes
router.get("/inventories", InventoryController.getInventories)
router.post("/inventories/:id", InventoryController.postInventory)
router.delete("/inventories/:id", authorization, InventoryController.deleteInventory)

//Midtrans
router.get("/payment/midtrans/token/:id", PaymentController.getMidtransToken)

router.use(errorHandler)

module.exports = router