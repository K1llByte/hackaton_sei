const express = require('express');
const axios = require('axios');
const router = express.Router();
const passport = require('passport');
const { post, route } = require('../app');
const FormData = require('form-data');

const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

API_URL = 'https://elearning.uminho.pt'

function check_auth(req, res, next)
{
    if(req.isAuthenticated())
    {
        //const decoded = jwt.decode(req.user.token);
        //req.user.username = decoded.username;
        //req.user.perms = decoded.perms;
        next();
    } 
    else
    {
        res.redirect("/login");
    }
}

// function auth_header(token)
// {
//     return {
//         headers: { 'Authorization': 'Bearer ' + token }
//     }
// }

// ---------------------------------------------------------------
//----------- ROTAS NAO NECESSITAM AUTENTICAÇAO ------------------
// ---------------------------------------------------------------


// GET /auth/bb
// GET /auth/bb/cb

router.get('/',(req,res) => {
    res.json({ "message":"chill" });
});

router.get('/auth/bb', passport.authenticate('oauth2'));

router.get('/login', (req, res, next) => {
    if(req.user != undefined)
    {
        res.redirect('/users/@me');
    }
    else
    {
        res.render('login');
    }
});


router.post('/login', passport.authenticate('local'), (req, res) => {
    // Data retrieve
    res.redirect('/eduasis')
});


// router.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy((err) => {
//     if (!err) {
//         res.redirect('/');
//     } else {
//         console.log('Destroy session error: ', err)
//     }
//   });
// });


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