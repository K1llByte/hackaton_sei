const express = require('express');
const User = require('../controllers/user');
const Course = require('../controllers/course');
const auth = require('../controllers/auth');

// ================================== //

const router = express.Router();

// ========= AUTH ROUTES ========= //

// POST /login
// POST /logout
// GET /users/:user
// GET /users/:user/courses

router.post('/api/login', (req, res) => {

    console.log(req.body);
    User.verify_password(req.body.username,req.body.password)
        .then(userdata => {
            if(userdata != null)
            {
                console.log("userdata",userdata);
                const token = auth.gen_token(userdata);
                res.json({ "TOKEN":token });
            }
            else
            {
                res.status(401).json({ "error":"Incorrect credentials" });
            }
        });
});


router.get('/api/users/:username',auth.authenticate(),(req,res) => {
    if(req.params.username === req.user.username)
    {
        User.get(req.params.username)
        .then(userdata => {
            res.json(userdata);
        })
        .catch(err => {
            res.status(401).json({ "error":"Forbidden" });
        });
    }
    else
    {
        res.status(401).json({ "error":"Forbidden" });
    }
});


router.get('/api/courses/:course_id',auth.authenticate(),(req,res) => {


    Course.get(req.params.course_id)
    .then(userdata => {
        res.json(userdata);
    })
    .catch(err => {
        res.status(401).json({ "error":"" });
    });
});


// router.post('/api/logout', (req, res) => {

//     const token = auth.fetch_token(req);
//     if(token == null)
//     {
//         res.status(401).json({ "error" : "Not logged in" });
//     }
//     else if(blacklist.has(token))
//     {
//         res.status(401).json({ "error" : "Token already revoked" });
//     }
//     else
//     {
//         blacklist.add(token);
//         blacklist.clear();
//         res.json({ "success" : "Succsessfully revoked token" });
//     }
// });


// ========= OTHER ENDPOINTS ========= //



// ================================== //

router.get('/api/test', auth.authenticate(), (req, res) => {
    
    // Resource.list_all()
    //     .then(data => { 
    //         res.json(data);
    //     })
    //     .catch(err => { 
    //         res.json('error', err);
    //     });
});


module.exports = router;