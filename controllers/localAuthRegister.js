const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

//register new user 'signup'
router.post('/', async (request, response) => {
  const { firstName, lastName, email, password } = request.body

  if (!password || password.length < 6 || !email || !firstName) {
    return response.status(400).json({
      error: 'password must be at least 6 characters and you must include a an email and first name'
    })
  }
  let isUserAlready = await User.findOne({ email: email })
  if (isUserAlready) {
    return response.status(400).json({
      error: 'a user with this email already exists'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = router