var Hangout = require('../models/hangout');

module.exports.mostRecent = function (req, res) {
  Hangout.find({}, function (err, results) {
      res.json(results);
  }).sort({ _id: -1 }).limit(1);
}

module.exports.hangout = function (req, res) {
	var hangout = new Hangout(req.body);
	hangout.save(function (err, result) {
		res.json(result);
	});
}