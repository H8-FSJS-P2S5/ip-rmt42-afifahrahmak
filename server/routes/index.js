const express = require('express');
const HistoryController = require('../controllers/HistoryController');
const router = express.Router();

router.get('/questions', HistoryController.create); 
router.put('/questions', HistoryController.update); 


module.exports = router;