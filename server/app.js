var express     = require('express');
    app         = express();
    mongoose    = require('mongoose');
    Interviewer = require('./models/interviewers');
    path        = require('path');

app.locals.pretty = true;
app.set('port', (process.env.PORT || 5000))

var dbURI = 'mongodb://localhost:27017/database'
mongoose.connect(process.env.MONGOLAB_URI || dbURI, function (err) {
    if (err) {
        throw err;
    }
});

app.get('/tokbox', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/html',
        'tokbox_test.html'))
});

app.get('/pubnub', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/html',
        'pubnub_test.html'))
});

app.get('/site', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/views/html',
        'projectWebsite.html'))
});


app.get('/', function (req, res) {
    Interviewer.find({}, function (err, docs) {
        res.write('Interviewers:\n');
        res.write(JSON.stringify(docs, null, 4));
        res.end();
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app running at localhost:' + app.get('port'));
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        process.exit(0);
    });
});
