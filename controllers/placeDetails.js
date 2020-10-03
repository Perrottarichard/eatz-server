const express = require('express')
const router = express.Router()
const { getPlaceDetails, getPlaceDetailsPhoto } = require('../api-helpers/getFromGoogle')

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
router.post('/photo', async (request, response) => {
  let photo_ref = request.body.photo_reference
  console.log('getting photo')
  try {
    const resObject = await getPlaceDetailsPhoto(photo_ref)
    response.json(resObject.data)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router