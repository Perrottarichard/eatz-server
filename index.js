const express = require('express');
require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const passport = require('passport')
const searchCoordinatesRouter = require('./controllers/searchByCoordinates')
const autoSearchPredictionsRouter = require('./controllers/autoSearchPredictions')
const textSearchRouter = require('./controllers/textSearch')
const googleAuthRouter = require('./controllers/googleAuth')
const facebookAuthRouter = require('./controllers/facebookAuth')
const authHelpers = require('./controllers/authHelpers')
const newRestaurantRequestRouter = require('./controllers/newRestaurantRequest')
const itemsRouter = require('./controllers/items')
const placeDetailsRouter = require('./controllers/placeDetails')
const userAccountRouter = require('./controllers/userAccount')
const promosRouter = require('./controllers/promos');
const User = require('./models/User');
require('./googlePassport')(passport)
require('./facebookPassport')(passport)

const app = express()
app.use(cors({

  //dev
  // origin: "http://localhost:3000",

  //prod
  origin: "https://pizzapizzadelivery.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // allow session cookie from browser to pass through
}))

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

app.use(express.json())
// app.use(express.static(path.join(__dirname, 'build')))

//express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { sameSite: "none", secure: "auto", domain: "https://pizzapizzadelivery.netlify.app" }
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes to google places api endpoints
app.use('/api/searchByCoordinates', searchCoordinatesRouter)
app.use('/api/autoSearchPredictions', autoSearchPredictionsRouter)
app.use('/api/textSearch', textSearchRouter)
app.use('/api/placeDetails', placeDetailsRouter)

//google login authentication route
app.use('/auth/google', googleAuthRouter)

//facebook login authentication route
app.use('/auth/facebook', facebookAuthRouter)

// authentication endpoint helpers
app.use('/authhelpers', authHelpers)

//POST new restaurant request endpoint
app.use('/api/requestNewRestaurant', newRestaurantRequestRouter)

//GET promotions
app.use('/api/promos', promosRouter)

//GET menu items
app.use('/api/menuItems', itemsRouter)

//PUT user account info (favorites, cart, addresses)
app.use('/account', userAccountRouter)

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if logged in, send the profile response,
// otherwise, send a 401 not authenticated response
// authCheck before routing to home page

// app.get('*', (request, response) => {
//   response.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.get("/", authCheck, async (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})