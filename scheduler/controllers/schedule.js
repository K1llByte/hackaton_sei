const Schedule = require('../models/schedule');
const axios = require('axios');

API_URL = 'http://localhost:7700'

// function mk_hours(hours,minutes)
// {
//     const new_date = new Date('January 2, 1975 00:00:00');
//     new_date.setHours(hours,minutes);
//     return new_date;
// }

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
        .findOne({
            "course_id": course_id,
            "shifts.shift_id": shift
        },
        { 
            "_id":0,
            "name":1,
            "shifts": {
                '$elemMatch': {
                    "shift_id": shift
                }
            },
            "schedule": {
                '$arrayElemAt': [ "$shifts.schedule" , 0 ]
            }
        })
        .exec();
        // .aggregate([
        //     {
        //         $match: {
        //             "course_id": course_id,
        //             "shifts.shift_id": shift
        //         }
        //     },
        //     {
        //         $project : {
        //             _id:0,
        //             "name":1,
        //             "shifts": { 
        //                 "$elemMatch": {
        //                     "shift_id": shift
        //                 }
        //             },
        //             "schedule": {
        //                 "$arrayElemAt": [ "$shifts.schedule" , 0 ]
        //             }
        //         }
        //     }
        // ])
        
        //.findOne({course_id: course_id, "shifts.shift_id": shift},{ _id:0, "name":1 , "schedule":{ '$arrayElemAt': [ "$shifts.schedule" , 0 ] }})
        
        //.findOne({course_id: course_id, "shifts.shift_id": shift },{ "_id":0, "name":1 , "shifts":{ '$elemMatch': { "shift_id": shift } }, "schedule":{ '$arrayElemAt': [ "$shifts.schedule" , 0 ] } })
}

// Returns a user by username
module.exports.get_all = async (tuples) => {
    let result = [];
    for(let i = 0 ; i < tuples.length; ++i)
    {
        
        const cid = tuples[i].course_id;
        const shifts = tuples[i].shifts;
        console.log("tuples[i]",tuples[i]);
        console.log("shifts",shifts);
        for(let j = 0 ; j < shifts.length ; ++j )
        {
            const sid = shifts[j];
            let response = (await this.get(cid,sid)).toObject();
    
            console.log("response",response);

            if(response != null)
            {
                result.push({
                    "course_id":   cid,
                    "course_name": response.name,
                    "shift_id":    sid,
                    "schedule":    response.shifts[0].schedule //.schedule 
                });
            }
        } 
    }

    return result;
}


module.exports.mk_user_schedule = async (user) => {
    
    let userdata = await axios.get(`${API_URL}/api/users/${user.username}`,auth_header(user.token));
    return this.get_all(userdata.data.courses);;
}


module.exports.user_courses = async (user) => {
    let userdata = await axios.get(`${API_URL}/api/users/${user.username}`,auth_header(user.token));
    return userdata.data;
}