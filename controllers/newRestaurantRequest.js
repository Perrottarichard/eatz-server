const express = require('express')
const router = express.Router()
const NewRestaurant = require('../models/NewRestaurantRequest')

router.post('/', async (req, res) => {
  const restaurantToAdd = {
    restaurantName: req.body.name,
    latitude: req.body.lat,
    longitude: req.body.lon
  }
  try {
    await NewRestaurant.create(restaurantToAdd)
    res.json(`Thanks for helping us grow.  We will contact ${restaurantToAdd.restaurantName} shortly`)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router