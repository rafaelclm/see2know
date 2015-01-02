var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function (app) {
    
    var userController = require('./server/controllers/UserController.js');
    var userFacebookController = require('./server/controllers/UserFacebookController.js');
    var tutorialController = require('./server/controllers/TutorialController.js');
    
    app.use('/public', express.static('./public'));
    
    app.get('/', function (request, response) {
        
        if (request.session.user) {
            response.render('index', {
                username: request.session.username,
                name: request.session.name
            });
        }
        else if (request.session.passport.user) {
            userFacebookController.existsUser(request.session.passport.user._json.email, function (error, user) {
                
                if (user === null) {
                    userFacebookController.signupByFacebook(request.session.passport.user, 
                    function (error, user) {
                        if (error) {
                            response.redirect('/login');
                        } else {
                            createSession(user);
                        }
                    });
                }
                else {
                    createSession(user);
                }
            });
        }
        else {
            response.redirect('/login');
        }

        function createSession(user){
            request.session.user = user.id;
            request.session.username = user.username;
            request.session.name = user.name;
            response.render('index', {
                username: request.session.username,
                name: request.session.name
            });
        }

    });
    
    app.get('/signup', function (request, response) {
        
        if (request.session.user) {
            response.redirect('/');
        }
        response.render('signup', {
            msg: request.session.msg
        });
    });
    
    app.get('/login', function (request, response) {
        if (request.session.user) {
            response.redirect('/');
        }
        response.render('login', {
            msg: request.session.msg
        });
    });
    
    //Passport Router
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/', 
        failureRedirect: '/login'
    }),
      function (request, response) {
        response.redirect('/');
    });
    
    app.get('/logout', function (request, response) {
        request.session.destroy(function () {
            response.redirect('/login');
        });
    });
    
    app.post('/signup', bodyParser.json(), userController.signup);
    app.post('/user', bodyParser.json(), userController.updateUser);
    app.delete('/user', userController.deleteUser);
    app.post('/login', bodyParser.json(), userController.login);
    app.get('/user/profile', userController.getUserProfileBySession);
    app.get('/user/profile/:id', userController.getUserProfileById);
    
    app.post('/tutorial', bodyParser.json(), tutorialController.saveTutorial);
    app.post('/tutorial/:id/image', bodyParser.urlencoded({
        extended: true
    }), tutorialController.setTutorialMedia);
    app.get('/tutorial/image/:filename', tutorialController.getImageTutorial);
    app.get('/tutorial/published/skip/:skip/limit/:limit/:search/:category', tutorialController.getTutorialsPublished);
    app.post('/tutorial/favorites/skip/:skip/limit/:limit', bodyParser.json(), tutorialController.getFavorites);
    app.get('/tutorial/my/skip/:skip/limit/:limit', tutorialController.getMyTutorials);

}