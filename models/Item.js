const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  type: String,
  variants: [String],
  choices: [String],
  pizza_sizes: [String],
  beverage_sizes: [String],
  regular_toppings: [String],
  premium_toppings: [String],
  pizza_base_prices: [Object],
  beverage_base_prices: Number,
  add_ons: [Object]
})
module.exports = mongoose.model('Item', ItemSchema)

