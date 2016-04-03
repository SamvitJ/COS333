var express                = require('express');
    mongoose               = require('mongoose');
    bodyParser             = require('body-parser'),
    path                   = require('path');
    Interviewer            = require('./models/interviewer');
    interviewersController = require('./controllers/interviewers-controller.js')

var app = express();

// server/DB config
app.set('port', (process.env.PORT || 5000))

var dbURI = 'mongodb://localhost:27017/database'
mongoose.connect(process.env.MONGOLAB_URI || dbURI, function (err) {
    if (err) {
        throw err;
    }
});

// API endpoints
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/interviewers', interviewersController.list);
app.post('/api/interviewers', interviewersController.create);

app.get('/', function (req, res) {
    Interviewer.find({}, function (err, docs) {
        res.write('Interviewers:\n');
        res.write(JSON.stringify(docs, null, 4));
        res.end();
    });
});

// static routing
app.use('/', express.static(path.join(__dirname, '../client/views/html')));

app.use('/static', express.static(path.join(__dirname, '../client/js')));
app.use('/static', express.static(path.join(__dirname, '../client/js/controllers')));
app.use('/static', express.static(path.join(__dirname, '../client/js/services')));
app.use('/static', express.static(path.join(__dirname, '../client/views/css')));
app.use('/static', express.static(path.join(__dirname, '../client/views/resources')));
app.use('/static', express.static(path.join(__dirname, '../client/views/xml')));

// start server
app.listen(app.get('port'), function () {
    console.log('Node app running at localhost:' + app.get('port'));
});

// close mongo connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        process.exit(0);
    });
});
