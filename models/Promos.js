const mongoose = require('mongoose')

const PromoSchema = new mongoose.Schema({
  description: String,
  code: String
})
module.exports = mongoose.model('Promo', PromoSchema)