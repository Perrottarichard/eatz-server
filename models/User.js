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
  password: {
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
      itemType: String,
      selectedVariant: String,
      selectedSize: String,
      selectedRegularToppings: [String],
      selectedPremiumToppings: [String],
      selectedBeverages: [String],
      restaurantName: String,
      restaurantId: String,
      totalPrice: Number,
    }
  ]
  ,
  activeCartBilling: {
    beforePromoPrice: Number,
    afterPromoPrice: Number,
    promoApplied: String,
    discount: String,
    priceDiff: Number,
    qualifyingOrderId: String
  },
  orders: [
    {
      cart: [
        {
          itemType: String,
          selectedVariant: String,
          selectedSize: String,
          selectedRegularToppings: [String],
          selectedPremiumToppings: [String],
          selectedBeverages: [String],
          restaurantName: String,
          restaurantId: String,
          totalPrice: Number,
        }
      ],
      activeCartBilling: {
        beforePromoPrice: Number,
        afterPromoPrice: Number,
        promoApplied: String,
        discount: String,
        priceDiff: Number,
        qualifyingOrderId: String
      },
      confirmation: String,
      date: { type: Date, default: Date.now },
      creditCardTip: { type: Number, default: 0 },
      paymentInfo: {
        creditCardNumber: String,
        creditCardExpire: String,
        creditCardType: String,
        creditCardNameOnCard: String,
        creditCardCVV: String
      }
    }
  ],
  paymentInfoArray: [{
    creditCardNumber: String,
    creditCardExpire: String,
    creditCardType: String,
    creditCardNameOnCard: String,
    creditCardCVV: String
  }],
  addresses: [{
    locationName: String,
    addressNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    specialInstructions: String
  }]
})

module.exports = mongoose.model('User', UserSchema)