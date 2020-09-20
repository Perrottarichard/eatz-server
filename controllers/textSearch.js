const express = require('express')
const router = express.Router()
const { getTextSearch } = require('../api-helpers/getFromGoogle')

router.post('/', async (request, response) => {
  let search = request.body.search
  try {
    const resObject = await getTextSearch(search)
    response.json(resObject.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router