var Interviewer = require('../models/interviewer');

module.exports.create = function (req, res) {
  var interviewer = new Interviewer(req.body);
  interviewer.save(function (err, result) {
    res.json(result);
  });
}

module.exports.list = function (req, res) {
  Interviewer.find({}, function (err, results) {
    res.json(results);
  });
}

module.exports.hangout = function (req, res) {
	var hangout = new Hangout(req.body);
	hangout.save(function (err, result) {
		res.json(result);
	});
}