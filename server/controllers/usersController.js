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

module.exports.listInterviewers = function (req, res) {
  User.find({interviewer:true}, function (err, results) {
    res.json(results);
  });
}