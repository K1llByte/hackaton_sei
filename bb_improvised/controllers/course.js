const Course = require('../models/course');

module.exports.get = (cid) => {
    return Course
        .findOne({ course_id: cid },{ _id:0 })
        .exec();
}
