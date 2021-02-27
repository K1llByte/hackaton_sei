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

// ---------------------------------------------------------------
// ------------------------- ROUTES ------------------------------
// ---------------------------------------------------------------

router.get('/',(req,res) => {
    res.json({ "message":"chill" });
});


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
            res.redirect('/');
        }
        else 
        {
            console.log('Destroy session error: ', err);
        }
    });
});


router.get('/schedule', check_auth, async (req,res) => {

    Schedule.make_schedule(req.user)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ "error": err.message })
    });
});



module.exports = router;