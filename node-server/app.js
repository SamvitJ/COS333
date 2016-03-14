var express = require('express');
var app = express();

app.locals.pretty = true;
app.set('port', (process.env.PORT || 5000))

app.get('/', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect((process.env.MONGOLAB_URI || 'mongodb://localhost:27017/database'), function(err, db) {
        if (err) {
            throw err;
        }
        db.collection('interviewers').find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send('Interviewers:\n' + JSON.stringify(result, null, 4));
        });
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app running at localhost:' + app.get('port'));
});
