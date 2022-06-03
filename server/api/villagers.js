const express = require('express')
const router = express.Router()
const data = require('../../assets/data')
const Villagers = data.villagers

router.get('/', async (req, res, next) => {
  try {
    res.json(Villagers);
  } catch (error) {
    next(error)
  }
})

module.exports = router
