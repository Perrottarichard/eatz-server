const express = require('express')
const router = express.Router()

const CLIENT_HOME = 'http://localhost:3000'

//in app.js /authhelpers

//successful login
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    })
  }
})

//failed login with message
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: "user authentication failed"
  })
})

//redirect to home on logout
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect(CLIENT_HOME, 200)
})

module.exports = router