const express = require('express')
const router = express.Router()
const { getPlaceDetails } = require('../api-helpers/getFromGoogle')

router.post('/', async (request, response) => {
  let place_id = request.body.place_id.id
  console.log('getting place details')
  try {
    const resObject = await getPlaceDetails(place_id)
    response.json(resObject.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router