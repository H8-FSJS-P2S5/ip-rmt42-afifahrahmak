if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express')
const session = require("express-session"); // --->(session)
const passport = require('passport'); // --->(steam login)
const SteamStrategy = require("passport-steam").Strategy; // --->(steam login)

const {User} = require("./models");

const app = express()
const port = 3000
const cors = require("cors")

///--------------------------------------->(session)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
///---------------------------------------

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


///--------------------------------------->(steam login)
// passport.use(
//   new SteamStrategy(
//     {
//       returnURL: `http://localhost:3000/auth/steam/return`,
//       realm: `http://localhost:3000/`,
//       apiKey: process.env.STEAM_API_KEY,
//     },
//     async (identifier, profile, done) => {
//       profile.identifier = identifier;

//       let user = await User.findOne({ steamId: profile.id });

//       if (!user) {
//         user = await new User({
//           steamId: profile._json.steamid,
//           steamUsername: profile._json.personaname,
//         }).save();
//       }

//       return done(null, user);
//     }
//   )
// );
app.use(passport.initialize());
///---------------------------------------

// Serialization and deserialization
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     next(error)
//     done(error, null);
//   }
// });
///---------------------------------------

app.use(require("./routes/router.js"))

module.exports = app
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })