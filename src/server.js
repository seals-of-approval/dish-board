const Hapi = require('hapi');
const routes = require('./routes.js');
const Inert = require('inert');
const CookieAuth = require('hapi-auth-cookie');
const jwt = require('json-web-token');
const env = require('env2');

env('./config.env');

const server = new Hapi.Server();

// const token = '191f179355b4e4f1514a66d747986e932985c735';
const secret = process.env.CLIENT_SECRET;

const payload = {
  'typ': 'JWT',
  'sub': 'user-info',
  'exp': Date.now() + 24 * 60 * 60 * 1000,
  'iat': Date.now()
};

const algorithm = 'HS256';

jwt.encode(secret, payload, algorithm, function (err, token) {
  if (err) {
    return console.error(err.name, err.message);
  } else {
    console.log(token);
  }
});

const defaultRoute = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public'
    }
  }
};

server.connection({ port: process.env.PORT || 4000 });

server.register([Inert, CookieAuth], (registerError) => {
  if (registerError) throw registerError;

  server.route([defaultRoute, ...routes]);
});

module.exports = server;
