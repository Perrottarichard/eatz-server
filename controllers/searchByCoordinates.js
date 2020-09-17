const express = require('express')
const router = express.Router()
const { getByCoordinates } = require('../api-helpers/getFromGoogle')

router.post('/', async (request, response) => {
  let lat = request.body.lat
  let lon = request.body.lon
  try {
    const resObject = await getByCoordinates(lat, lon)
    response.json(resObject.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router