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
router.put('/addPizza', async (req, res) => {
  let user_id = req.body.user_id
  let item = req.body.item
  try {
    const user = await User.findById(user_id)
    user.cart.push(item)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})

router.put('/addBeverages', async (req, res) => {
  let user_id = req.body.user_id
  let item = req.body.item
  try {
    const user = await User.findById(user_id)
    user.cart.push(item)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/removeCart', async (req, res) => {
  let user_id = req.body.user_id
  let item_id = req.body.item_id
  console.log(item_id)
  try {
    const user = await User.findById(user_id)
    let updated = user.cart.filter(i => i.id !== item_id)
    user.cart = updated
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/updateActiveCartBilling', async (req, res) => {
  let user_id = req.body.user_id
  console.log(user_id)
  let totalPrice = req.body.totalPrice
  let diff = req.body.diff
  let promoApplied = req.body.promoApplied
  let discount = req.body.discount
  const info = {
    totalOrderPrice: totalPrice,
    promoApplied: promoApplied,
    discount: discount,
    diff: diff
  }
  try {
    const user = await User.findById(user_id)
    user.activeCartBilling = info
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router