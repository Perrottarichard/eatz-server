const express = require('express')
const passport = require('passport')
const router = express.Router()

//google auth
router.get('/', passport.authenticate('google', { scope: ['profile'] }))

//google auth callback
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/')
})

module.exports = router