require('dotenv').config();
const axios = require('axios')

const getByCoordinates = async (lat, lon) => {
  try {
    return await axios.get(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${lon}`, {
      headers: {
        'user-key': `${process.env.ZOMATO_KEY}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getByCoordinates
}

