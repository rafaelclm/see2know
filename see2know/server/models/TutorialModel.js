var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TutorialSchema = new Schema({
    title: String,
    pages: Schema.Types.Mixed,
    creationDate: Date,
    lastUpdate: Date,
    user: String,
    published: Boolean,
    imageLesson: String,
    description: String,
    category: String
});

TutorialSchema.index({ title: 'text', body: 'text'});

mongoose.model('Tutorial', TutorialSchema);