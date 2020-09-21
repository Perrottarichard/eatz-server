const express = require('express')
const passport = require('passport')
const router = express.Router()

//facebook auth
router.get('/', passport.authenticate('facebook'))

//facebook auth callback
router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/')
})

module.exports = router