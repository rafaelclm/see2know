var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
	digest('base64').toString();
}

exports.signup = function (request, response) {
    
    var user = new User({
        username: request.body.username
    });
    
    user.set('hashed_password', hashPW(request.body.password));
    user.set('email', request.body.email);
    user.set('name', request.body.name);
    user.set('favorites', []);
    
    user.save(function (error) {
        if (error) {
            response.status(400).json(error);
        } else {
            request.session.user = user.id;
            request.session.username = user.username;
            request.session.name = user.name;
            response.status(200).json({ user: user });
        }
    });

};

exports.login = function (request, response) {
    
    User.findOne({
        username: request.body.username
    }).exec(function (error, user) {
        
        if (!user) {
            error = 'USER_NOT_FOUND';
        } else if (user.hashed_password === hashPW(request.body.password.toString())) {
            
            request.session.regenerate(function () {
                request.session.user = user.id;
                request.session.username = user.username;
                request.session.name = user.name;
                user.hashed_password = undefined;
                response.status(200).json({});
            });

        } else {
            error = 'AUTHENTICATION_FAILED';
        }
        if (error) {
            response.status(401).json({ error: error });
        }

    });
};

exports.getUserProfileBySession = function (request, response) {
    
    User.findOne({
        _id: request.session.user
    }).exec(function (error, user) {
        if (!user) {
            response.json(404, {
                error: 'User Not Found.'
            });
        } else {
            user.hashed_password = undefined;
            response.json({ user: user });
        }
    });
};

exports.getUserProfileById = function (request, response) {
    
    User.findOne({
        _id: request.param('id')
    }).exec(function (error, user) {
        if (!user) {
            response.json(404, {
                error: 'User Not Found.'
            });
        } else {
            user.hashed_password = undefined;
            response.json({ user: user });
        }
    });
};

exports.updateUser = function (request, response) {
    
    if (!request.session.user) {
        response.status(401).json();
    }

    User.findOne({
        _id: request.session.user
    }).exec(
        function (error, user) {

            user.set('username', request.body.username);
            user.set('name', request.body.name);
            user.set('email', request.body.email);
            user.set('profileImage', request.body.profileImage);
            user.set('gender', request.body.gender);
            user.set('birthday', request.body.birthday);
            user.set('location', request.body.location);
            user.set('favorites', request.body.favorites);

            user.save(function (error) {

                if (error) {
                    request.session.error = error;
                } else {
                    request.session.msg = 'User Updated.';
                    user.hashed_password = undefined;
                    response.status(200).json({ user: user });
                }
            });
        });
};

exports.deleteUser = function (request, response) {
    User.findOne({
        _id: request.session.user
    }).exec(function (error, user) {
        if (user) {
            user.remove(function (error) {
                if (error) {
                    request.session.msg = error;
                }
                request.session.destroy(function () {
                    response.redirect('/login');
                });
            });
        } else {
            request.session.msg = "User Not Found!";
            request.session.destroy(function () {
                response.redirect('/login');
            });
        }
    });
};