var mongoose = require('mongoose');

var Schema = mongoose.Schema;
module.exports = mongoose.model('Hangout', new Schema ({
    url: String
}));
