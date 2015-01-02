var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configFacebook = require('./server/config/facebook.js');

var mongoose = require('mongoose');

require('./server/models/UserModel.js')
require('./server/models/TutorialModel.js');

var conn = mongoose.connect('mongodb://localhost:27017/openedu');

var app = express();

// Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: configFacebook.facebook_api_key,
    clientSecret: configFacebook.facebook_api_secret ,
    callbackURL: configFacebook.callback_url,
    profileFields: ['id', 'displayName', 'link', 'photos', 'gender', 'birthday', 'location', 'email']
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(
        function () {
            //Check whether the User exists or not using profile.id
            //Further DB code.
            return done(null, profile);
        });
}));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(expressSession({
    secret: 'SECRET',
    saveUninitialized: true, // (default: true)
    resave: true, // (default: true)
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: new mongoStore({
        db: mongoose.connection.db,
        collection: 'sessions'
    })
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app);

app.listen(1337);