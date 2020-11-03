# PizzaPizza (server)

This project is the server side of a demo, full-stack pizza delivery web app.

The live app is hosted at:
https://pizzapizzadelivery.herokuapp.com

View the client repository here: https://github.com/Perrottarichard/pizzapizza-client

## Core Technologies
| Technology  | For |
| ------------| -------|
| Express | NodeJS web application framework |
| passportJS | authentication middleware for Google OAUTH2.0 and Local Authentication strategies |
| Axios | client-server communication / CRUD operations
| MongoDB Atlas | cloud data storage |
| Mongoose | Object Data Modeling |

## Server Features
* Google OAUTH2.0 authentication (passport-google-oauth20)
* Local email/password authentication (password-local)
* Password encryption (bcrypt)
* Session cookie generated, stored in Mongo Store, and used for authentication (express-session, connect-mongo)
* Automated email sent on new user registration and order placement (nodemailer)
* All fetching from the Google Places and Google Maps APIs is done server-side and sent to the client (axios)

