const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('./models/User')

module.exports = (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        facebookId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }
      try {
        let user = await User.findOne({ facebookId: profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (error) {
        console.log(error)
      }
    }))

  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    console.log(id)
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
}