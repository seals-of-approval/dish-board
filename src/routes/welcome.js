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
    request(myOptions, (err, res, body) => {
      if (err) throw err;
      const myToken = JSON.parse(body).access_token;
      createJwt(myToken);
      console.log(`By the way, we've got the token: ${myToken}`);
      reply('worked!');
    });
    // reply.view('profile')
  }
};

module.exports = welcome;
