const GoogleStrategy = require('passport-google-oath20').Strategy
const mongoose = require('mongoose')
const User = require('./models/User')

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
    }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}