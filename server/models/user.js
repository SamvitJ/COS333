var mongoose = require('mongoose');

var Schema = mongoose.Schema;
module.exports = mongoose.model('User', new Schema ({
    name: String,
    email: String,
    google_token: String,
    interviewer: Boolean,

    school: String,
    headline: String,
    rate: Number,
    calendar: String,
    bio: String,
}));