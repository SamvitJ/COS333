var mongoose = require('mongoose');

var Schema = mongoose.Schema;
module.exports = mongoose.model('Interviewer', new Schema ({
    name: String,
    school: String,
    headline: String,
    bio: String
}));

module.exports = mongoose.model('Hangout', new Schema ({
    url: String
}));
