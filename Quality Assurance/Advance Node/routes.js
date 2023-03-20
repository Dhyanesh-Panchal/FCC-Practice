const passport = require('passport');
const bcrypt = require('bcrypt');


const ensureAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        console.log('Failed in ensureAuthenticated')
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
        console.log(req.isAuthenticated());
        res.redirect('/chat');
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

            res.redirect('/chat');
        }
    )

    app.get('/profile', (req, res, next) => {
        console.log('before ensureAuth: ', req.isAuthenticated());
        return next();
    }, ensureAuthenticated, (req, res) => {
        console.log('Rendering Profile');
        res.render('profile', { username: req.user.username });
    })

    app.route('/chat').get(ensureAuthenticated, (req, res) => {
        console.log('rendering chat');
        res.render('chat', { user: req.user })
    })

    app.route('/logout').get((req, res) => {
        req.logOut();
        res.redirect('/')
    })

    app.route('/auth/github').get(passport.authenticate('github'));
    app.route('/auth/github/callback').get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
        req.session.user_id = req.user.id;
        res.redirect('/chat');
    })
}