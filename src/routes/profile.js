const createJwt = require('../create-jwt');
const getProfile = require('../getprofile');

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
          getProfile(token.accessToken, (err, profile) => {
            if (err) throw err;
            else reply.view('profile', profile);
          });
        }
      });
    }
  }

};

module.exports = profile;
