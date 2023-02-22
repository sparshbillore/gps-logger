const express = require('express')
const router = express.Router()
const { gpsSummary, deviceDetails } = require('../controllers/deviceController')

const {protect} = require('../middleware/authMiddleware')

router.get('/summary',protect,  gpsSummary)
router.get('/:deviceId',protect,  deviceDetails)


module.exports = router