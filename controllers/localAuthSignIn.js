const express = require('express')
const passport = require('passport')
const router = express.Router()


const CLIENT_HOME =
  //dev
  'http://localhost:3000'

//prod
// "https://pizzapizzadelivery.herokuapp.com"


//in app.js /auth/local/signin

//local auth
router.post('/', passport.authenticate('local'),
  function (req, res) {
    res.json(req.user)
  })

module.exports = router