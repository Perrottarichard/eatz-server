const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Order', OrderSchema)