const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('./models/User')
const nodemailer = require('nodemailer')

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken)
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value
      }
      try {
        let user = await User.findOne({ googleId: profile.id })
        console.log('useringooglePassportfunction', user)
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          // create reusable transporter object
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'richardmendacks@gmail.com',
              pass: `${process.env.MAILPASS}`,
            },
            tls: { rejectUnauthorized: false }
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"PizzaPizza" <richardmendacks@gmail.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Welcome to PizzaPizza", // Subject line
            text: "Thanks for joining the best pizza delivery service on the planet", // plain text body
            html: "<p>Thanks for joining the best pizza delivery service on the planet</p>", // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

          done(null, user)
        }
      } catch (error) {
        console.log(error)
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