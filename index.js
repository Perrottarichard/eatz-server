const express = require('express');
require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const searchCoordinatesRouter = require('./controllers/searchByCoordinates')
const autoSearchPredictionsRouter = require('./controllers/autoSearchPredictions')
const textSearchRouter = require('./controllers/textSearch')
const googleAuthRouter = require('./controllers/googleAuth')
const facebookAuthRouter = require('./controllers/facebookAuth')
require('./googlePassport')(passport)
require('./facebookPassport')(passport)

const app = express()
app.use(cors())

//connect to DB
const MONGO_URI = process.env.MONGO_URI
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })


app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

//express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes to google api endpoints
app.use('/api/searchByCoordinates', searchCoordinatesRouter)
app.use('/api/autoSearchPredictions', autoSearchPredictionsRouter)
app.use('/api/textSearch', textSearchRouter)

//google login authentication route
app.use('/auth/google', googleAuthRouter)

//facebook login authentication route
app.use('/auth/facebook', facebookAuthRouter)

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/build/index.html'));
});

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})