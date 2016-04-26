var Interview = require('../models/interview');

module.exports.create = function (req, res) {
  var interview = new Interview(req.body)
  interview.save(function (err, result) {
    res.json(result);
  });
}

module.exports.listInterviewers = function (req, res) {
  Interview.find({}, function (err, results) {
    res.json(results);
  });
}