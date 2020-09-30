const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  displayName: {
    type: String
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  favoriteRestaurants: [String],
  cart: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      },
      // quantity: Number,
      // toppings: [String],
      // flavor: String,
      // size: String,
      totalPrice: Number
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Order'
    }
  ],
  paymentInfo: {
    firstName: String,
    lastName: String,
    shippingAddress: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    creditCardNumber: String,
    creditCardExpire: String,
    creditCardType: String,
    creditCardNameOnCard: String,
    creditCardCVV: String
  },
  addresses: [{
    userAssignedName: String,
    buildingName: String,
    number: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    specialInstructions: String
  }]
})
module.exports = mongoose.model('User', UserSchema)