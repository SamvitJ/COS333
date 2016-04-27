var Interview = require('../models/interview');

module.exports.create = function (req, res) {
	console.log(req.body)
  var interview = new Interview(req.body)
  interview.save(function (err, result) {
    res.json(result);
  });
}

module.exports.listInterviews = function (req, res) {
  Interview.find({}, function (err, results) {
    res.json(results);
  });
}