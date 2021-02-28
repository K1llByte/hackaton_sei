const Request = require('../models/request');
const axios = require('axios');


function auth_header(token)
{
    return {
        headers: { 'Authorization': 'Bearer ' + token }
    }
}

// module.exports.mk_request = (user) => {
//     let userdata = await axios.get(`${API_URL}/api/users/${user.username}`,auth_header(user.token));
// }