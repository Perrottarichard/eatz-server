const mongoose = require('mongoose')

const NewRestaurantRequestSchema = new mongoose.Schema({
  restaurantName: String,
  latitude: String,
  longitude: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('NewRestaurant', NewRestaurantRequestSchema)