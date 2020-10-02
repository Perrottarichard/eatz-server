const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  type: String,
  variants: [String],
  choices: [String],
  pizzaSizes: [String],
  beverageSizes: [String],
  regularToppings: [String],
  premiumToppings: [String],
  pizzaBasePrices: Object,
  beverageBasePrices: Number,
  addOns: Object
})
module.exports = mongoose.model('Item', ItemSchema)

