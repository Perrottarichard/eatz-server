const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const searchCoordinatesRouter = require('./controllers/searchByCoordinates')
const autoSearchPredictionsRouter = require('./controllers/autoSearchPredictions')
const textSearchRouter = require('./controllers/textSearch')
const authRouter = require('./controllers/auth')

const app = express()
require('./passport')(passport)

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


app.use(cors())
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
app.use('/auth', authRouter)

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})