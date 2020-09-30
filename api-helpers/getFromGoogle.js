require('dotenv').config();
const axios = require('axios')

const getByCoordinates = async (lat, lon) => {
  try {
    console.log('fetching nearby places')
    const res = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&type=restaurant&keyword=pizza&key=${process.env.GOOGLE_KEY}`
    )
    return res
  } catch (error) {
    console.log(error)
  }
}
const getAutoSearchPredictions = async (search) => {
  try {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&types=geocode&key=${process.env.GOOGLE_KEY}`)
  } catch (error) {
    console.log(error)
  }
}
const getTextSearch = async (search) => {
  try {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${process.env.GOOGLE_KEY}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getByCoordinates,
  getAutoSearchPredictions,
  getTextSearch
}

