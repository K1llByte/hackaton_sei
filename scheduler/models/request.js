const mongoose = require('mongoose');

const request_schema = new mongoose.Schema({
    course_id:     String,
    current_shift: String,
    username:      String,
    wanted_shift:  String
}, 
{
    versionKey: false,
    collection: 'requests'
});

module.exports = mongoose.model('request', request_schema);