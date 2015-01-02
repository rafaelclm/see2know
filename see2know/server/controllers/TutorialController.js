var mongoose = require('mongoose');
var mongooseFS = require('mongoose-fs');
var Tutorial = mongoose.model('Tutorial');
var formidable = require('formidable');
var fs = require('fs-extra');
var fstream = require('fstream');
var util = require('util');
var qt = require('quickthumb');
var tar = require('tar');
var zlib = require('zlib');
var GridForm = require('gridform');
var GridFS = require('gridfs-stream');
var Uuid = require('node-uuid');

exports.saveTutorial = function (request, response) {
    
    if (!request.session.user) {
        response.status(401).json();
    }

    Tutorial.findOne({
        _id: request.body._id
    }).exec(function (error, tutorial) {
        
        if (!tutorial) {
            tutorial = new Tutorial();
        }
        
        tutorial.set('title', request.body.title);
        tutorial.set('pages', request.body.pages);
        
        if (!tutorial.get('creationDate')) {
            tutorial.set('creationDate', new Date());
        }
        
        tutorial.set('lastUpdate', new Date());
        tutorial.set('user', request.session.user);
        tutorial.set('published', request.body.published);
        tutorial.set('imageLesson', request.body.imageLesson);
        tutorial.set('videoTutorial', request.body.videoTutorial);
        tutorial.set('description', request.body.description);
        tutorial.set('category', request.body.category);
        
        tutorial.save(function (error) {
            if (error) {
                response.status(400).json(error);
            } else {
                response.json({ tutorial: tutorial });
            }
        });
    });
    
};

exports.setTutorialMedia = function (request, response, next) {
    
    if (request.session.user) {
        
        var filename = (request.param('id') === 'generate'? Uuid.v1() : request.param('id'));
        
        var options = {
            db: mongoose.connection.db, mongo: mongoose.mongo, filename: function () {
                return filename;
            }
        };
        
        var form = new GridForm(options);
        var gfs = new GridFS(mongoose.connection.db, mongoose.mongo);
        
        gfs.remove({ filename: filename }, function (error) {
            
            if (error) return handleError(error);
            form.parse(request, function (error, fields, files) {
                response.status(200).json({ filename: files.file.path });
            });

        });

    }
};

exports.getImageTutorial = function (request, response) {
    
    if (request.session.user) {
        
        var gfs = new GridFS(mongoose.connection.db, mongoose.mongo);
        var source = gfs.createReadStream({
            filename: request.param('filename')
        });
        
        source.on('error', function (error) {
            response.json({ error: error.message });
        });
        
        source.pipe(response);
    }
}

exports.getTutorialsPublished = function (request, response) {
    
    var search = request.param('search');
    var category = request.param('category');
    var find;
    
    if (search === 'no-text') {
        find = Tutorial.find();
    }
    else {
        
        find = Tutorial.find(
            { $text: { $search: search } },
            { score: { $meta: "textScore" } }
        );
        
    }
    
    if (category !== 'uncategorized') {
        find = find.where('category').equals(category);
    }
    
    find.where('published').equals(true).skip(request.param('skip')).limit(request.param('limit'))
        .sort('-creationDate').exec(
        function (error, tutorials) {
            
            if (error) {
                response.status(500).json({ error: error.message });
            }
            else {
                response.status(200).json({ tutorials: tutorials });
            }

        }
    );
   
};

exports.getFavorites = function (request, response) {
    var user = request.body;
    
    Tutorial.find().where('_id').in(user.favorites).skip(request.param('skip')).limit(request.param('limit')).exec(
        function (error, tutorials) {
            
            if (error) {
                response.status(500).json({ error: error.message });
            }
            else {
                response.status(200).json({ tutorials: tutorials });
            }

        }
    );
}

exports.getMyTutorials = function (request, response){

    Tutorial.find({
        user: request.session.user
    }).skip(request.param('skip')).limit(request.param('limit')).exec(
        function (error, tutorials) {
            
            if (error) {
                response.status(500).json({ error: error.message });
            }
            else {
                response.status(200).json({ tutorials: tutorials });
            }

        }
    );
}