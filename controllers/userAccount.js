const express = require('express')
const router = express.Router()
const User = require('../models/User')
const shortid = require('shortid')
const nodemailer = require('nodemailer')

//in app.js /api/account

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
  let totalPrice = req.body.totalPrice
  let diff = req.body.diff
  let promoApplied = req.body.promoApplied
  let newTotal = req.body.newTotal
  const info = {
    beforePromoPrice: totalPrice,
    afterPromoPrice: newTotal,
    promoApplied: promoApplied,
    priceDiff: diff
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
router.put('/clearCart', async (req, res) => {
  let user_id = req.body.user_id
  try {
    const user = await User.findById(user_id)
    user.activeCartBilling = {}
    user.cart = []
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/addNewOrder', async (req, res) => {
  let user_id = req.body.user_id
  let creditCardTip = req.body.creditCardTip
  let cardId = req.body.cardId
  try {
    const user = await User.findById(user_id)
    const cartCopy = [...user.cart]
    const confirmation = shortid.generate()
    const cardUsed = user.paymentInfoArray.find(x => x.id === cardId)
    const order = { user: user_id, confirmation: confirmation, cart: cartCopy, activeCartBilling: user.activeCartBilling, creditCardTip: creditCardTip, paymentInfo: cardUsed }
    user.orders.push(order)
    user.activeCartBilling = {}
    user.cart = []
    const saved = await user.save()
    res.json(saved)
    // create reusable transporter object
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'pizzapizzamailer@gmail.com',
        pass: `${process.env.MAILPASS}`,
      },
      tls: { rejectUnauthorized: false }
    });
    let mailBody = `
    <h3>Your order has been placed</h3>
    <h5>${user.orders[user.orders.length - 1].cart[0].restaurantName} is preparing your order</h5>
    <h6>Please allow 25 - 35 minutes for delivery</h6>
    <h6>Confirmation code: ${user.orders[user.orders.length - 1].confirmation}</h6>
    
    `
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"PizzaPizza" <pizzapizzamailer@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "PizzaPizza order confirmation", // Subject line
      text: "Order placed", // plain text body
      html: mailBody, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  } catch (error) {
    console.log(error)
  }

})
router.put('/addNewAddress', async (req, res) => {
  let user_id = req.body.user_id
  let addressObject = req.body.addressObject
  try {
    const user = await User.findById(user_id)
    user.addresses.push(addressObject)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/editAddress', async (req, res) => {
  let user_id = req.body.user_id
  let indexToEdit = req.body.indexToEdit
  let addressObject = req.body.addressObject
  try {
    const user = await User.findById(user_id)
    user.addresses[indexToEdit] = addressObject
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/addNewPaymentInfo', async (req, res) => {
  let user_id = req.body.user_id
  let infoObject = req.body.infoObject
  try {
    const user = await User.findById(user_id)
    user.paymentInfoArray.push(infoObject)
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})
router.put('/editPayment', async (req, res) => {
  let user_id = req.body.user_id
  let indexToEdit = req.body.indexToEdit
  let infoObject = req.body.infoObject
  try {
    const user = await User.findById(user_id)
    user.paymentInfoArray[indexToEdit] = infoObject
    const saved = await user.save()
    res.json(saved)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router