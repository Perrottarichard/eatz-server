const express = require('express')
const passport = require('passport')
const router = express.Router()

const CLIENT_HOME =
  //dev
  'http://localhost:3000'

//prod
// "https://pizzapizzadelivery.herokuapp.com"

//in app.js "/auth/facebook"

//facebook auth
router.get('/', passport.authenticate('facebook'))

//facebook auth callback
router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/login/failed', successRedirect: `${CLIENT_HOME}/dashboard` }))

module.exports = router