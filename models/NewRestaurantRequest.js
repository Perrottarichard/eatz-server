const mongoose = require('mongoose')

const NewRestaurantRequestSchema = new mongoose.Schema({
  restaurantName: String,
  city: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('NewRestaurant', NewRestaurantRequestSchema)