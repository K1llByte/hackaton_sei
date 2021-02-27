const Schedule = require('../models/schedule');
const axios = require('axios');

API_URL = 'http://localhost:7700'

function mk_hours(hours,minutes)
{
    const new_date = new Date('January 2, 1975 00:00:00');
    new_date.setHours(hours,minutes);
    return new_date;
}

function auth_header(token)
{
    return {
        headers: { 'Authorization': 'Bearer ' + token }
    }
}


// Returns a user by username
module.exports.get = (course_id,shift) => {
    if(course_id == null || shift == null)
        return null;
    
    return Schedule
        .find({course_id: course_id, "shifts.shift_id": shift},{ _id:0, "name":1 , "schedule":{ $arrayElemAt: [ "$shifts.schedule" , 0 ] }})
        .exec()
}

// Returns a user by username
module.exports.get_all = async (tuples) => {
    var result = [];
    for(let i = 0 ; i < tuples.length; ++i)
    {
        const cid = tuples[i].course_id;
        const sid = tuples[i].shift;
        let response = await this.get(cid,sid);
        
        if(response != null)
        {
            result.push({
                "course_id":   cid,
                "course_name": response.name,
                "shift_id":    sid,
                "schedule": response.schedule
            });
        }
    }

    return result;
}


module.exports.make_schedule = async (user) => {
    
    let userdata = await axios.get(`${API_URL}/api/users/${user.username}`,auth_header(user.token));

    console.log("userdata.data",userdata.data);

    //let schedules = this.get_all(userdata.data.courses);

    //console.log("schedules",schedules);
    
    return this.get_all(userdata.data.courses);;
}

// [
//     {
//         "course_id":"SC",
//         "course_name":"Sistemas de Computação",
//         "shift_id":"PL1",
//         "schedule": {
//             "day_of_week": 1,
//             "start": "1975-01-01T23:00:00.000Z",
//             "end":   "1975-01-01T23:00:00.000Z",
//             "room":  "Sala 2, DI",
//             "professor": "Prof. JVV",
//             "note":  ""
//         }
//         z
//     },
//     {
//         "course_id":"LI1",
//         "course_name":"Laboratórios de Informatica I",
//         "shift_id":"PL1",
//         "schedule": {
//             "day_of_week": 1,
//             "start": "1975-01-01T23:00:00.000Z",
//             "end":   "1975-01-01T23:00:00.000Z",
//             "room":  "Sala 2, DI",
//             "professor": "Prof. JVV",
//             "note":  ""
//         }
//     }
// ]