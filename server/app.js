var express     = require('express');
    mongoose    = require('mongoose');
    Interviewer = require('./models/interviewers');
    path        = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000))

var dbURI = 'mongodb://localhost:27017/database'
mongoose.connect(process.env.MONGOLAB_URI || dbURI, function (err) {
    if (err) {
        throw err;
    }
});

app.listen(app.get('port'), function () {
    console.log('Node app running at localhost:' + app.get('port'));
});

app.get('/', function (req, res) {
    Interviewer.find({}, function (err, docs) {
        res.write('Interviewers:\n');
        res.write(JSON.stringify(docs, null, 4));
        res.end();
    });
});

app.get('/googlecf5dd8e4691a1f5b.html', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/views/html',
     'googlecf5dd8e4691a1f5b.html'))
});

app.use('/static', express.static(path.join(__dirname, '../client')));
app.use('/static', express.static(path.join(__dirname, '../client/views/html')));
app.use('/static', express.static(path.join(__dirname, '../client/views/resources')));
app.use('/static', express.static(path.join(__dirname, '../client/views/css')));
app.use('/static', express.static(path.join(__dirname, '../client/views/xml')));
app.use('/static', express.static(path.join(__dirname, '../client/js')));

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        process.exit(0);
    });
});
