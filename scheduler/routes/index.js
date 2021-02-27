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

API_URL = 'https://localhost:7700'

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
//----------- ROTAS NAO NECESSITAM AUTENTICAÇAO ------------------
// ---------------------------------------------------------------

router.get('/',(req,res) => {
    res.json({ "message":"chill" });
});

router.get('/login',(req,res) => {
    res.render('login');
});

// router.get('/login', (req, res, next) => {
//     if(req.user != undefined)
//     {
//         res.redirect('/users/@me');
//     }
//     else
//     {
//         res.render('login');
//     }
// });


router.post('/login', passport.authenticate('local'), (req, res) => {
    // Data retrieve
    res.redirect('/schedule')
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
            console.log('Destroy session error: ', err)
        }
    });
});


router.get('/schedule', check_auth, async (req,res) => {
    try {
        let asd = await Schedule.get('SC','PL1');
        console.log(asd);
        res.json(asd);
    } catch {
        console.log("error");
    }
});


// ---------------------------------------------------------------
// ------------- PAGINAS QUE NECESSITAM AUTENTICAÇAO -------------
// ---------------------------------------------------------------

// router.get('/eduasis', check_auth, async (req,res) => {

//     let resources_p = await axios.get(`${API_URL}/resources`,auth_header(req.user.token));
//     let posts_p = await axios.get(`${API_URL}/posts`,auth_header(req.user.token));

//     let resources = resources_p.data;
//     let posts = posts_p.data;
//     res.render('home_page',{
//         'posts': posts,
//         'resources': resources,
//         'time_difference': time_difference,
//         'user':req.user
//     });
// });




module.exports = router;



// POST /login
// POST /logout
// GET /users/:user
// GET /users/:user/courses

// GET /courses/:course_id/shifts