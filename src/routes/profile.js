// const request = require('request');
const createJwt = require('../create-jwt');

// const setOptions = (code) => {
//   const options = {
//     url: 'https://github.com/login/oauth/access_token',
//     method: 'POST',
//     headers: {
//       accept: 'application/json'
//     },
//     form: {
//       client_id: process.env.CLIENT_ID,
//       client_secret: process.env.CLIENT_SECRET,
//       redirect_uri: `${process.env.BASE_URL}/welcome`,
//       code: code
//     }
//   };
//   return options;
// };

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
          reply('Welcome!');
        }
      });
    }
  }

};

module.exports = profile;
