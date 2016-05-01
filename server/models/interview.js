var mongoose = require('mongoose');

var Schema = mongoose.Schema;
module.exports = mongoose.model('Interview', new Schema ({
    complete: Boolean,
    start: Date,
    end: Date,
    topic: String,
    description: String,
    interviewer: String,
    interviewerName: String,
    interviewee: String,
    hangout: String,
    intervieweeFeedback: {
        feedback: String,
        code: String
    },
    interviewerReview: {
        review: String,
        rating: Number
    },
}));