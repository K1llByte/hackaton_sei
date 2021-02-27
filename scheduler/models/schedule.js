const mongoose = require('mongoose');


const schedule_schema = new mongoose.Schema({
    start:     Date,
    end:       Date,
    room:      String,
    professor: String,
    note:      String
}, 
{
    versionKey: false
});

const shift_schema = new mongoose.Schema({
    shift_id: String,
    schedule: schedule_schema
}, 
{
    versionKey: false
});

const course_schema = new mongoose.Schema({
    course_id: String,
    name:      String,
    shifts:    [shift_schema]
},
{
    versionKey: false,
    collection: 'schedules'
});

module.exports = mongoose.model('course_schema', course_schema);