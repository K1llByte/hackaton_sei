const express = require('express');
const axios = require('axios');
const router = express.Router();
const passport = require('passport');
const { post, route } = require('../app');
const FormData = require('form-data');

const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const jwt = require('jsonwebtoken');
const Schedule = require('../controllers/schedule');



function check_auth(req, res, next)
{
    if(req.isAuthenticated())
    {
        const decoded = jwt.decode(req.user.token);
        req.user.username = decoded.username;
        next();
    } 
    else
    {
        res.redirect("/login");
    }
}

function auth_header(token)
{
    return {
        headers: { 'Authorization': 'Bearer ' + token }
    }
}

function to_hour_minute(date)
{
    return date.toISOString().substr(11,5);
}

// ---------------------------------------------------------------
// ------------------------- ROUTES ------------------------------
// ---------------------------------------------------------------

// router.get('/',(req,res) => {
//     res.json({ "message":"chill" });
// });


router.get('/login',(req,res) => {
    res.render('login');
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/schedule');
});


router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (!err) 
        {
            res.redirect('/login');
        }
        else 
        {
            console.log('Destroy session error: ', err);
        }
    });
});


router.get('/schedule', check_auth, async (req,res) => {
    Schedule.mk_user_schedule(req.user)
    .then(data => {
        res.render('schedule',{schedule: data, to_hour_minute: to_hour_minute});
    })
    .catch(err => {
        res.render("error", err.message);
    });
});


router.get('/custom', async (req,res) => {
    //console.log("req.body.custom",req.body.custom);

    Schedule.get_all((req.body == undefined || req.body.custom == undefined) ? [] : req.body.custom)
    .then(data => {
        res.render('schedule',{schedule: data, to_hour_minute: to_hour_minute});
    })
    .catch(err => {
        res.render("error", err.message );
    });
});

router.get('/courses', async (req,res) => {
    res.render('courses',{
        "courses" : [
            {
                "course_id": "LI1",
                "name":"Laboratórios de Informática I",
                "shifts": ["PL1","PL2","T1"]
            },
            {
                "course_id": "LI2",
                "name":"Laboratórios de Informática II",
                "shifts": ["PL1"]
            },
            {
                "course_id": "LI3",
                "name":"Laboratórios de Informática III",
                "shifts": ["PL1"]
            },
            {
                "course_id": "LI4",
                "name":"Laboratórios de Informática IV",
                "shifts": []
            }
        ]
    });
});

module.exports = router;