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
    return `${date.getHours()}:${date.getMinutes()}`
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


// router.get('/schedule', check_auth, async (req,res) => {
router.get('/schedule', (req,res) => {
    // Schedule.make_schedule(req.user)
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({ "error": err.message })
    // });
    res.render('schedule',{schedule: [
        {
           "course_id":"MNONL",
           "course_name":"Métodos Numéricos e Otimização Não Linear",
           "shift_id":"TP1",
           "schedule":{
              "day_of_week":1,
              "start":"1975-01-01T08:00:00.000Z",
              "end":"1975-01-01T10:00:00.000Z",
              "room":"Sala 0.22, Edifício 1",
              "professor":"Prof. Teresa Monteiro",
              "note":""
           }
        },
        {
           "course_id":"MDIO",
           "course_name":"Métodos Determinísticos em Investigação Operacional",
           "shift_id":"TP1",
           "schedule":{
              "day_of_week":1,
              "start":"1975-01-01T10:00:00.000Z",
              "end":"1975-01-01T12:00:00.000Z",
              "room":"Sala 0.22, Edifício 1 / Online",
              "professor":"Prof. Valério",
              "note":""
           }
        },
        {
           "course_id":"SD",
           "course_name":"Sistemas Distribuídos",
           "shift_id":"PL1",
           "schedule":{
              "day_of_week":3,
              "start":"1975-01-01T08:00:00.000Z",
              "end":"1975-01-01T10:00:00.000Z",
              "room":"Sala 1.15, Edifício 1",
              "professor":"Prof. JOP",
              "note":""
           }
        },
        {
           "course_id":"RC",
           "course_name":"Redes de Computadores",
           "shift_id":"PL1",
           "schedule":{
              "day_of_week":3,
              "start":"1975-01-01T10:00:00.000Z",
              "end":"1975-01-01T12:00:00.000Z",
              "room":"Sala 1.15, Edifício 1",
              "professor":"Prof. Paulinho",
              "note":""
           }
        },
        {
           "course_id":"DSS",
           "course_name":"Desenvolvimento de Sistemas de Software",
           "shift_id":"PL1",
           "schedule":{
              "day_of_week":3,
              "start":"1975-01-01T13:00:00.000Z",
              "end":"1975-01-01T15:00:00.000Z",
              "room":"Sala 1.15, Edifício 1",
              "professor":"Prof. Creissac",
              "note":""
           }
        },
        {
           "course_id":"BD",
           "course_name":"Base de Dados",
           "shift_id":"PL1",
           "schedule":{
              "day_of_week":5,
              "start":"1975-01-01T10:30:00.000Z",
              "end":"1975-01-01T12:30:00.000Z",
              "room":"Sala 0.32, Edifício 2",
              "professor":"Prof. Belo",
              "note":""
           }
        }
     ]});
});



module.exports = router;