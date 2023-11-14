const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', async(req, res) => {
  await res.send('ROUTER CHECK COMPLETE')
})

module.exports = router