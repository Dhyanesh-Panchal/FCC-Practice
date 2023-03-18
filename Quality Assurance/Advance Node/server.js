'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const { ObjectID } = require('mongodb');
const LocalStrategy = require('passport-local');

const app = express();
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/')
  }
}


app.set('view engine', 'pug');
app.set('views', './views/pug');


fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());



myDB(async (client) => {
  const myDatabase = await client.db('fcc-advance-node').collection('users');


  app.route('/').get((req, res) => {
    console.log('Database Connected Succesfully!')
    res.render('index', { title: 'Connected to Database', message: 'Please login', showLogin: true });
  })

  app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    console.log(`User ${req.user.username} is Authenticated!`);
    res.redirect('/profile');
  })

  app.route('/profile').get(ensureAuthenticated, (req, res) => {
    res.render('profile', { username: req.user.username });
  })

  app.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect('/')
  })

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found')
  })

  passport.serializeUser((user, done) => {
    done(null, user._id);
  })

  passport.deserializeUser((id, done) => {
    myDatabase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    })
    // done(null, null);
  })

  passport.use(new LocalStrategy((username, password, done) => {
    myDatabase.findOne({ username: username }, (err, user) => {
      console.log(`User ${username} attemped to login`);
      if (err) {
        return done(err);
      }
      else if (!user) {
        console.log('User dont exist');
        return done(null, false);
      }
      else if (password != user.password) {
        console.log('Incorrect password');
        return done(null, false);
      }
      else {
        return done(null, user);
      }
    })
  }))
}).catch(e => {
  app.render('index', { title: e, message: 'Unable to connect to database' });
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
