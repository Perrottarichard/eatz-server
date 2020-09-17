require('dotenv').config();
const axios = require('axios')

const getByCoordinates = async (lat, lon) => {
  try {
    return await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=restaurant&key=${process.env.GOOGLE_KEY}`
    )
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getByCoordinates
}

