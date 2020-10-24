const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const nodemailer = require('nodemailer')

//register new user 'signup'
router.post('/', async (request, response) => {
  const { firstName, lastName, email, password } = request.body

  if (!password || password.length < 6 || !email || !firstName) {
    return response.status(400).json({
      error: 'password must be at least 6 characters and you must include a an email and first name'
    })
  }
  let isUserAlready = await User.findOne({ email: email })
  if (isUserAlready) {
    return response.status(400).json({
      error: 'a user with this email already exists'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash
  })

  const savedUser = await user.save()
  try {
    let user = await User.findOne({ email: email })
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
      text: "Successfully registered", // plain text body
      html: "<p>Thanks for joining the best pizza delivery service on the planet</p>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error)
  }
  response.json(savedUser)
})

module.exports = router