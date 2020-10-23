const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
  },
    async (req, username, password, done) => {
      try {
        let user = await User.findOne({ email: username })
        if (user) {

          //compare passwords -- returns a boolean
          let correctPass = await bcrypt.compare(password, user.password)
          if (!correctPass) {
            return done(null, false)
          }
          done(null, user)
        } else {
          return done(null, false)
        }
      } catch (error) {
        console.log('error')
      }
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