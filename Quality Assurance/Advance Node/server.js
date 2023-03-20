'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const auth = require('./auth');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const URI = process.env.MONGO_URI;
const store = new MongoStore({ url: URI });

const onAuthorizeSuccess = (data, accept) => {
  console.log('successful connection to socket.io');
  accept(null, true);
}

const onAuthorizeFail = (data, message, error, accept) => {
  if (error) {
    throw new Error(message);
  }
  console.log('failed connection to socket.io:', message);
  accept(null, false);
}


app.set('view engine', 'pug');
app.set('views', './views/pug');


fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  key: 'express.sid',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: store,
}))
app.use(passport.initialize());
app.use(passport.session());



myDB(async (client) => {
  const myDatabase = await client.db('fcc-advance-node').collection('users');

  routes(app, myDatabase);

  io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: 'express.sid',
      secret: process.env.SESSION_SECRET,
      store: store,
      success: onAuthorizeSuccess,
      fail: onAuthorizeFail
    })
  )

  let currentUsers = 0;
  io.on('connection', socket => {
    console.log(`user ${socket.request.user.username} is connected`);
    ++currentUsers;
    io.emit('user', {
      username: socket.request.user.username,
      currentUsers,
      connected: true
    });
    socket.on('chat message', message => {
      io.emit('chat message', {
        username: socket.request.user.username,
        message: message
      })
    })
    socket.on('disconnect', () => {
      --currentUsers;
      console.log(`Mitra disconnected`);
      io.emit('user', {
        username: socket.request.user.username,
        currentUsers,
        connected: false
      });
    })
  })

  // io.on('disconnect', socket => {
  //   console.log('User disconnected');
  //   --currentUsers;
  // })


  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found')
  })

  auth(app, myDatabase);


}).catch(e => {
  app.render('index', { title: e, message: 'Unable to connect to database' });
})



const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});