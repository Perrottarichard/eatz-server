const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({})
    res.json(items)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router