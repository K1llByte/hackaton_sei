const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Set up default mongoose connection
const MONGODB_URL = 'mongodb://127.0.0.1/bb_improvised';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Connected to MongoDB successfully...")
});

const index_router = require('./routes/index');

var app = express();


//app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false,parameterLimit: 1000000 }));
app.use('/storage',express.static(path.join(__dirname, 'storage')));

//parse application/json


// Routes
app.use('/', index_router);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.json({ "error" : err.message });
});

module.exports = app;
