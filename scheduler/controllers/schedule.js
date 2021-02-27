const Schedule = require('../models/schedule');


function mk_hours(hours,minutes)
{
    const new_date = new Date('January 2, 1975 00:00:00');
    new_date.setHours(hours,minutes);
    return new_date;
}


// Returns a user by username
module.exports.get = (course_id,shift) => {
    return Schedule
        .find({course_id: course_id, "shifts.shift_id": shift},{ _id:0, "schedule":{ $arrayElemAt: [ "$shifts.schedule" , 0 ] }})
        .exec()
}

// db.schedules.find({course_id: "SC", "shifts.shift_id": "PL1"},{ _id:0, "schedule":{ $arrayElemAt: [ "$shifts.schedule" , 0 ] }})