const passport = require('passport');
const bcrypt = require('bcrypt');


const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/')
    }
}

module.exports = (app, myDatabase) => {
    app.route('/').get((req, res) => {
        console.log('Database Connected Succesfully!')
        res.render('index', { title: 'Connected to Database', message: 'Please login', showLogin: true, showRegistration: true, showSocialAuth: true });
    })

    app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
        console.log(`User ${req.user.username} is Authenticated!`);
        res.redirect('/profile');
    })

    app.route('/register').post(async (req, res, next) => {
        let user = await myDatabase.findOne({ username: req.body.username }).catch(err => {
            next(err);
        });

        if (user) {
            // User already exist
            res.redirect('/')
        }
        else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 12);
            user = {
                username: req.body.username,
                password: hashedPassword
            }
            user = await myDatabase.insertOne(user).catch(err => {
                res.redirect('/');
            });
            console.log('User registered is:', user);
            next(null, user.ops[ 0 ]);
        }

    },
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/profile');
        }
    )

    app.route('/profile').get(ensureAuthenticated, (req, res) => {
        res.render('profile', { username: req.user.username });
    })

    app.route('/logout').get((req, res) => {
        req.logOut();
        res.redirect('/')
    })

    app.route('/auth/github').get(passport.authenticate('github'));
    app.route('/auth/github/callback').get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/profile');
    })
}