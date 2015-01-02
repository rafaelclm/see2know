var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    name: String,
    hashed_password: String,
    profileImage: String,
    favorites: Array,
    gender: String,
    birthday: Date,
    location: Schema.Types.Mixed
});

mongoose.model('User', UserSchema);