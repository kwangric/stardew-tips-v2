const express = require('express')
const router = express.Router()
const data = require('../../assets/data')
const Fish = data.fish

router.get('/', async (req, res, next) => {
  try {
    res.json(Fish);
  } catch (error) {
    next(error)
  }
})

module.exports = router
