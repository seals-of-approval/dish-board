const request = require('request');
const createJwt = require('../create-jwt');

const setOptions = (code) => {
  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: {
      accept: 'application/json'
    },
    form: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/welcome`,
      code: code
    }
  };
  return options;
};

const welcome = {
  method: 'GET',
  path: '/welcome',
  handler: (req, reply) => {
    const myOptions = setOptions(req.query.code);
    if (!req.query.code) {
      return reply().code(404);
    }
    request(myOptions, (err, res, body) => {
      if (err) throw err;
      const myToken = JSON.parse(body).access_token;
      createJwt.encodeJWT(myToken, function (err, token) {
        if (err) {
          return console.error(err.name, err.message);
        } else {
          req.cookieAuth.set({auth: token});
          reply.view('continue');
        }
      });
    });
  }
};

module.exports = welcome;
