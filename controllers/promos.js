const express = require('express')
const router = express.Router()
const Promos = require('../models/Promos')

router.get('/', async (req, res) => {
  try {
    const promos = await Promos.find({})
    res.json(promos)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router