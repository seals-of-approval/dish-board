const querystring = require('querystring');
const env = require('env2')('./config.env');

const githubOauth = {
  client_id: process.env.CLIENT_ID,
  redirect_uri: `${process.env.BASE_URL}/welcome`
};

const login = {
  method: 'GET',
  path: '/login',
  handler: (req, reply) => {
    reply.redirect(`https://github.com/login/oauth/authorize?${querystring.stringify(githubOauth)}`);
  }
};

module.exports = login;
