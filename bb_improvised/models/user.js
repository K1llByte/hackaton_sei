const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    course_id: String,
    shift: String
}, 
{
    versionKey: false
});

const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    courses: [course_schema]
}, 
{
    versionKey: false,
    collection: 'users'
});

module.exports = mongoose.model('users', user_schema);