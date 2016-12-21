var axios = require('axios');
var querystring = require('querystring');

var LoginAPI = function (email, password, API_BASE_URL) {

  var data = {
    user_email: email,
    user_pass: password,
  };

  var config = {
    method: 'post',
    url: '/login',
    baseURL: API_BASE_URL,
    data: querystring.stringify(data)
  };


  return axios.request(config).then(function (response) {
    if(response.data.status_code === 200) {
      return response.data.data;
    }
    else {
      throw new Error(response.data.data);
    }
  }, function (error) {
    throw new Error("Check your network connection");
  });

}

module.exports = LoginAPI;
