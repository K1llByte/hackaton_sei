const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
//const methodOverride = require('method-override');

const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');



dotenv.config();
// Set up default mongoose connection
const MONGODB_URL = 'mongodb://127.0.0.1/scheduler';
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Connected to MongoDB successfully...")
});

// // OAuth2 config
// passport.use(new OAuth2Strategy({
//     authorizationURL: "https://developer.blackboard.com/learn/api/public/v1/oauth2/authorizationcode",
//     tokenURL: "https://elearning.uminho.pt/learn/api/public/v1/oauth2/token",
//     clientID: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     callbackURL: "http://localhost:7700/auth/bb/cb"
// },
// function(accessToken, refreshToken, profile, cb) {
//     console.log("passed here");
//     cb(null,{ "username":"nome","password":"coisas" });
//     //User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//     //    return cb(err, user);
//     //});
// }
// ));

// Configuração da estratégia local
passport.use(new LocalStrategy(
    { usernameField: 'username' }, (user, pass, done) => {

        axios.post('http://localhost:7700/api/login/',{username: user, password: pass})
        .then(data => {
            const decoded = jwt.decode(data.data.TOKEN);
            
            const user_data = {
                "token" : data.data.TOKEN,
                "username" : decoded.username
            }
            done(null, user_data);
        })
        .catch(err => {
            done(err);
        });
    })
);

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
    done(null, user)
})
  
// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((user, done) => {
    done(null, user);
})


var index_router = require('./routes/index');
var app = express();

app.use(session({
    genid: (req) => {
      return uuidv4()
    },
    store: new FileStore({logFn: function(){}}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    retries: 0
}))

console.log("process.env.SECRET",process.env.SECRET);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next)
{
    // console.log('Signed Cookies: ', JSON.stringify(req.signedCookies))
    // console.log('Session: ', JSON.stringify(req.session))
    next()
})

app.use(fileUpload( {createParentPath:true} ));
// app.use(busboy())
app.use(bodyParser.urlencoded({ extended: false}));
//parse application/json
app.use(bodyParser.json());

// app.use(express.static('public'))




// Routes
app.use('/', index_router);
app.use('/static',express.static(path.join(__dirname, 'static')));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// app.set('etag', false)

// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store')
//   next()
// })

// error handler
app.use(function(err, req, res, next)
{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.render('error',{ "err" : err });
});

module.exports = app;