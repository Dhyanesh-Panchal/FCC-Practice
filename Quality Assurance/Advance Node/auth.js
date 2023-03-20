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
            if (err) return console.error(err);
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
            // else if (password != user.password)
            else if (!bcrypt.compareSync(password, user.password)) {
                console.log('Incorrect password');
                return done(null, false);
            }
            else {
                console.log('user Authenticated')
                return done(null, user);
            }
        })
    }))

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
        (accessToken, refreshToken, profile, cb) => {
            myDatabase.findOneAndUpdate(
                { id: profile.id },
                {
                    $setOnInsert: {
                        id: profile.id,
                        username: profile.username,
                        name: profile.displayName || '',
                        photo: profile.photos[ 0 ].value || '',
                        email: Array.isArray(profile.emails) ? profile.emails[ 0 ].value : 'No public email',
                        created_on: new Date(),
                        provider: profile.provider || ''
                    },
                    $set: {
                        last_login: new Date()
                    },
                    $inc: {
                        login_count: 1
                    }
                },
                {
                    upsert: true,
                    new: true
                },
                (err, data) => {
                    return cb()
                }
            )
        }))
}