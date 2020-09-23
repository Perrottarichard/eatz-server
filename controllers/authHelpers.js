const express = require('express')
const router = express.Router()

const CLIENT_HOME = 'http://localhost:3000'

//in app.js /authhelpers

//successful login
router.get('/login/success', (req, res) => {
  res.json(req.session._id)
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
  res.redirect(CLIENT_HOME)
})

module.exports = router