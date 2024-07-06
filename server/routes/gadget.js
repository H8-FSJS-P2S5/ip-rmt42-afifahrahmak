const express = require('express');
const Controller = require('../controllers/gadgetController');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandle');
const { authorization, authorizationAdmin } = require('../middlewares/authorization');
const multer = require('multer');
const authentication = require('../middlewares/authentication');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/gadgets',authentication,authorizationAdmin, Controller.createGadget);
router.post('/gadget/:id',authentication,authorizationAdmin, Controller.createGadgetSpec);
router.patch('/gadget/:id',authentication,authorizationAdmin,upload.single('imgUrl'), Controller.uploadImage);
router.patch('/gadget/:id/addRating',authentication,authorizationAdmin, Controller.addRating);
router.get('/',authentication, Controller.getAllGadget);
router.get('/gadgets',authentication, Controller.getAllGadget);
router.get('/gadgets/:id/shop', Controller.googleShopping);
router.get('/pub/gadgets', Controller.getAllGadgetPub);
router.get('/gadget/:id',authentication, Controller.getGadget);
router.get('/pub/gadget/:id', Controller.getGadgetPub);
router.put('/gadget/:id',authentication, authorizationAdmin, Controller.editGadget);
router.delete('/gadget/:id',authentication,authorizationAdmin, Controller.deleteGadget);

router.use(errorHandler)
module.exports = router;