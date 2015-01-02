var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.signupByFacebook = function (facebookUser, callback) {
    
    var user = new User();
    
    user.set('username', facebookUser._json.email);
    user.set('email', facebookUser._json.email);
    user.set('name', facebookUser.displayName);
    user.set('gender', facebookUser.gender);
    user.set('birthday', facebookUser.birthday);
    user.set('location', facebookUser.location);
    user.set('profileImage', facebookUser._json.picture.data.url);
    user.set('favorites', []);
    
    user.save(function (error) {
        callback(error, user);
    });
};

exports.existsUser = function (email, callback) {
    User.findOne({
        email: email
    }).exec(function (error, user) {
        callback(error, user);
    });
};