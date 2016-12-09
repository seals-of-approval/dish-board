const request = require('request');
const createJwt = require('../create-jwt');
const jsonToProfileObject = require('../helpers/json-to-profile-object');

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

const profile = {
  method: 'GET',
  path: '/profile',
  config: {
    auth: {
      strategy: 'session',
      mode: 'try'
    },
    handler: (req, reply) => {
      let jwt = req.auth.credentials.auth;
      createJwt.decodeJWT(jwt, function (err, token) {
        if (err) {
          reply('Stop trying to get into our website with a dodgy token, you animal');
        } else {
          getUser(token.accessToken, (err, response, user) => {
            if (err) reply(err);
            getIssues(token.accessToken, (err, response, body) => {
              if (err) reply(err);
              reply.view('profile', jsonToProfileObject(user, body));
            });
          });
        }
      });
    }
  }

};

module.exports = profile;
