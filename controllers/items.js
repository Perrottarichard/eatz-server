const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', async (req, res) => {
  console.log('getting items')
  try {
    const items = await Item.find({})
    console.log(items)
    res.json(items)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router