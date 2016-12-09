const request = require('request');
const jsonToProfileObject = require('./helpers/json-to-profile-object');

const getIssues = (accessToken, state, cb) => {
  request.get({
    url: `https://api.github.com/orgs/foundersandcoders/issues?sort=updated&filter=all&state=${state}`,
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
    getIssues(accessToken, 'open', (err, response, openissues) => {
      if (err) cb(err);
      getIssues(accessToken, 'closed', (err, response, closedissues) => {
        if (err) cb(err);
        cb(null, jsonToProfileObject(user, openissues, closedissues));
      });
    });
  });
};

module.exports = getProfile;
