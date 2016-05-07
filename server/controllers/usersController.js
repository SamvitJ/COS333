var User = require('../models/user');

module.exports.create = function (req, res) {
  var user = new User(req.body);
  user.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  User.find({}, function (err, results) {
    res.json(results);
  });
}

module.exports.getInterviewer = function (req, res) {
  var userID = req.query.google_token
  User.findOne({google_token:userID}, function (err, results) {
    res.json(results);
  });
}

module.exports.listInterviewers = function (req, res) {
  User.find({interviewer:true}, function (err, results) {
    res.json(results);
  });
}

module.exports.updateUser = function (req, res) {
  console.log("server updateUser called");
  console.log(req.body.interviewer);
  User.update(
    {google_token: req.params.google_token}, 
    {$set: {interviewer: req.body.interviewer,
    headline: req.body.headline, 
    rate: req.body.rate, availability: req.body.availability,
    bio: req.body.bio}},
    function(err, results) {
      console.log(results);
    });
}

module.exports.updateInterviewer = function (req, res) {
  User.update(
    {_id: req.body._id},
    {$set: { availability: req.body.availability }}, function(err, results) {
      // console.log(results)
    }
  );
}