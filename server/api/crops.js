const express = require('express')
const router = express.Router()
const data = require('../../assets/data')
const Crops = data.crops

router.get('/', async (req, res, next) => {
  try {
    res.json(Crops);
  } catch (error) {
    next(error)
  }
})

module.exports = router
