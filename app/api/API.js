var axios = require('axios');
var querystring = require('querystring');

const API_BASE_URL = "http://localhost:8000/api/";

var request = function (API_URL, data, method="post") {

  var config = {
    method: method,
    url: API_URL,
    baseURL: API_BASE_URL,
    data: querystring.stringify(data)
  };


  return axios.request(config).then(function (response) {
    if(response.data.status_code === 200) {
      return response.data.data;
    } else if (response.data.status_code === 401) {
      throw new Error(401);
    } else {
      throw new Error(response.data.data);
    }
  }, function (error) {
    throw new Error("Check your network connection");
  });

}

module.exports = {
  request: request
};
