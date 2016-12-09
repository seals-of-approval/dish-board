const request = require('request');
const jsonToProfileObject = require('./helpers/json-to-profile-object');

const getIssues = (accessToken, cb) => {
  request.get({
    url: 'https://api.github.com/orgs/fac9/issues?filter=all&state=all',
    headers: {
      'User-Agent': 'dish-board',
      Authorization: `token ${accessToken}`
    }
  }, cb);
};

const getUser = (accessToken, cb) => {
  request.get({
    url: 'https://api.github.com/user',
    headers: {
      'User-Agent': 'dish-board',
      Authorization: `token ${accessToken}`
    }
  }, cb);
};

const getProfile = (accessToken, cb) => {
  getUser(accessToken, (err, response, user) => {
    if (err) cb(err);
    getIssues(accessToken, (err, response, body) => {
      if (err) cb(err);
      cb(null, jsonToProfileObject(user, body));
    });
  });
};

module.exports = getProfile;
