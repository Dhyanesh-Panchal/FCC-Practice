const passport = require('passport');
const { ObjectID } = require('mongodb');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const GithubStrategy = require('passport-github');
require('dotenv').config();


module.exports = (app, myDatabase) => {
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
            else if (!bcrypt.compareSync(password, user.password)) {
                console.log('Incorrect password');
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        })
    }))

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'https://boilerplate-advancednode.dhyaneshpanchal.repl.co/auth/github/callback'
    },
        (accessToken, refreshToken, profile, cb) => {
            console.log(profile);
        }))
}