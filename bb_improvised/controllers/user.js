const User = require('../models/user');
const crypto = require('crypto');

// ===== CRUD Operations ===== //

// Returns all users list
module.exports.list_all = (no_password=false) => {
    return User
        .find({},{_id:0,password:!no_password})
        .exec();
}

// Returns a user by username
module.exports.get = (uname,no_password=false) => {
    return User
        .findOne({ username: uname },{ _id:0 })
        .exec();
}


// Updated user data
module.exports.set = (userdata) => {
    return User
        .updateOne({username:userdata.username},{$set : userdata})
        .exec();
}

// // Adds a new user data
// module.exports.add = (userdata) => {
//     const new_user = new User(userdata)
//     return new_user.save();
// }

// Deletes user by username
module.exports.delete = (uname) => {
    return User
        .deleteOne({ username: uname })
        .exec();
}

// Inserts a new user
module.exports.insert = (userdata) => {
    var new_user = new User(userdata);
    return new_user.save()
}

module.exports.total_users = () => {
    return User.count().exec()
}

// =========================== //


module.exports.verify_password = async (username,in_password) => {

    var userdata = await this.get(username)

    console.log("userdata",userdata);

    if(userdata != null)
    {
        return (in_password === userdata.password) ? 
            userdata : 
            null;
    }
    else
    {
        return null;
    }
    
}

// =========================== //