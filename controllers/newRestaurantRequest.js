const express = require('express')
const router = express.Router()
const NewRestaurant = require('../models/NewRestaurantRequest')

router.post('/', async (req, res) => {
  const restaurantToAdd = {
    restaurantName: req.body.name,
    city: req.body.city,
    country: req.body.country
  }
  try {
    await NewRestaurant.create(restaurantToAdd)
    res.json(`Thanks for helping us grow.  We will contact ${restaurantToAdd.restaurantName} shortly`)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router