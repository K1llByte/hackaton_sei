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
    couse_id: String,
    name:     String,
    shifts:   [shift_schema]
},
{
    versionKey: false,
    collection: 'schedules'
});

module.exports = mongoose.model('course_schema', course_schema);

// [
//     {
//         "couse_id": "DSS_ID",
//         "shifts" : [
//             {
//                 "shift_id": "TP1_ID",
//                 "schedule": {
//                     start: "startdate",
//                     end:   "enddate",
//                     room:  "Sala 2, DI",
//                     professor: "Prof. JVV",
//                     note:  "Isto é uma aula importante lmaoooo"
//                 }
//             },
//             {
//                 "shift_id": "TP2_ID",
//                 "schedule": {
//                     start: "startdate",
//                     end:   "enddate",
//                     room:  "Sala 3, DI",
//                     professor: "Prof. JCC",
//                     note:  "Isto é uma aula importante lmaoooo"
//                 }
//             }
//         ]
//     },
//     {
//         "couse_id": "SC_ID",
//         "shifts" : [
//             {
//                 "shift_id": "PL1_ID",
//                 "schedule": {
//                     start: "startdate",
//                     end:   "enddate",
//                     room:  "Sala 33, DI",
//                     professor: "Prof. IS",
//                     note:  ""
//                 }
//             }
//         ]
//     }
// ]