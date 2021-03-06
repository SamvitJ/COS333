var express                = require('express');
    mongoose               = require('mongoose');
    bodyParser             = require('body-parser');
    path                   = require('path');

    Interviewer            = require('./models/interviewer');
    User                   = require('./models/user');
    Hangout                = require('./models/hangout');
    Interview              = require('./models/interview'); 

    usersController       = require('./controllers/usersController.js');
    hangoutsController     = require('./controllers/hangoutsController.js');
    interviewsController   = require('./controllers/interviewsController.js');

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();      
}); 

// server/DB config
app.set('port', (process.env.PORT || 5000));

var dbURI = 'mongodb://localhost:27017/database'
mongoose.connect(process.env.MONGOLAB_URI || dbURI, function (err) {
    if (err) {
        throw err;
    }
});

// API endpoints
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/hangouts', hangoutsController.mostRecent);
app.post('/api/hangouts', hangoutsController.hangout);

app.get('/api/users', usersController.list);
app.post('/api/users', usersController.create);
app.put('/api/users/:google_token', usersController.updateUser);

app.get('/api/interviewers', usersController.listInterviewers);
app.put('/api/interviewers', usersController.updateInterviewer);

app.get('/api/interviewer', usersController.getInterviewer);

app.get('/api/interviews', interviewsController.listInterviews);
app.post('/api/interviews', interviewsController.create);


// For internal testing
app.get('/interviewers', function (req, res) {
    Interviewer.find({}, function (err, docs) {
        res.write('Interviewers:\n');
        res.write(JSON.stringify(docs, null, 4));
        res.end();
    });
});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        res.write('Users:\n');
        res.write(JSON.stringify(docs.reverse(), null, 4));
        res.end();
    });
});

// static routing
app.use('/', express.static(path.join(__dirname, '../client/views/html')));
app.use('/', express.static(path.join(__dirname, '../client/views')));

app.use('/static', express.static(path.join(__dirname, '../client/js')));
app.use('/static', express.static(path.join(__dirname, '../client/js/controllers')));
app.use('/static', express.static(path.join(__dirname, '../client/js/services')));
app.use('/static', express.static(path.join(__dirname, '../client/views/css')));
app.use('/static', express.static(path.join(__dirname, '../client/views/resources')));
app.use('/static', express.static(path.join(__dirname, '../client/views/xml')));
app.use('/static', express.static(path.join(__dirname, '../bootstrap4alpha2/dist/js/')));
app.use('/static', express.static(path.join(__dirname, '../bootstrap4alpha2/dist/css/')));
app.use('/static', express.static(path.join(__dirname, '../js/scheduler/')));

app.use('/static/dashboard', express.static(path.join(__dirname, '../client/js/dashboard')));
app.use('/static/dashboard', express.static(path.join(__dirname, '../client/views/css/dashboard')));
app.use('/static/dashboard', express.static(path.join(__dirname, '../client/views/fonts/dashboard')));
app.use('/static/dashboard', express.static(path.join(__dirname, '../client/views/resources/dashboard')));

app.use('/static/landing', express.static(path.join(__dirname, '../client/views/css/landing')));
app.use('/static/landing', express.static(path.join(__dirname, '../client/views/resources')));
app.use('/static/landing', express.static(path.join(__dirname, '../client/js/landing')));
app.use('/static/landing', express.static(path.join(__dirname, '../client/views/fonts/landing')));

app.use('/static/firepad', express.static(path.join(__dirname, '../client/views/css/firepad')));


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
