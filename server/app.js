var express     = require('express');
    app         = express();
    mongoose    = require('mongoose');
    Interviewer = require('./models/interviewers');
    path        = require('path');

app.locals.pretty = true;
app.set('port', (process.env.PORT || 5000))

mongoose.createConnection(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/database', function (err) {
    if (err) {
        throw err;
    }
});

app.get('/tokbox', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views', 'tokbox_test.html'))
});

app.get('/pubnub', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views', 'pubnub_test.html'))
});

app.get('/', function (req, res) {
    mongoose.connect((process.env.MONGOLAB_URI || 'mongodb://localhost:27017/database'), function(err, db) {
        if (err) {
            throw err;
        }
        Interviewer.find({}, function (err, docs) {
            res.write('Interviewers:\n');
            res.write(JSON.stringify(docs, null, 4));
            res.end();
        });
        /* db.collection('interviewers').find().toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send('Interviewers:\n' + JSON.stringify(result, null, 4));
        }); */
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app running at localhost:' + app.get('port'));
});
