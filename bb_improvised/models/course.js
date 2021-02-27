const mongoose = require('mongoose');

const course_schema = new mongoose.Schema({
    course_id: String,
    shifts:   [String]
}, 
{
    versionKey: false,
    collection: 'courses'
});

module.exports = mongoose.model('course', course_schema);