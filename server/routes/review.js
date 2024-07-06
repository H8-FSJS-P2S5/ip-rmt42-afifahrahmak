const express = require('express');
const router = express.Router();
const errorHandler = require('../middlewares/errorHandle');
const ReviewController = require('../controllers/reviewController');
const authentication = require('../middlewares/authentication');

router.post('/review/:id',authentication, ReviewController.createReview);
router.get('/reviews', authentication, ReviewController.getAllReview);


router.use(errorHandler)
module.exports = router;