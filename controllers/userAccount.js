const express = require('express')
const router = express.Router()
const User = require('../models/User')


//in app.js /account

//add favorite restaurant
router.put('/favorite', async (req, res) => {
  let user_id = req.body.user_id
  let place_id = req.body.place_id
  try {
    const user = await User.findById(user_id)
    user.favoriteRestaurants.push(place_id)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }

})
router.put('/removefavorite', async (req, res) => {
  let user_id = req.body.user_id
  let place_id = req.body.place_id
  try {
    const user = await User.findById(user_id)
    let updated = user.favoriteRestaurants.filter(place => place !== place_id)
    user.favoriteRestaurants = updated
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/addCart', async (req, res) => {
  let user_id = req.body.user_id
  let item = req.body.item
  console.log(user_id)
  console.log(item)
  try {
    const user = await User.findById(user_id)
    console.log(user)
    console.log(user.cart)
    user.cart.push(item)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router