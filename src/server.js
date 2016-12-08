const Hapi = require('hapi');
const env = require('env2')('./config.env');
const routes = require('./routes.js');
const Inert = require('inert');
const CookieAuth = require('hapi-auth-cookie');
const jwt = require('json-web-token');

const secret = process.env.CLIENT_SECRET;

const payload = {
  'typ': 'JWT',
  'sub': 'user-info',
  'exp': Date.now() + 24 * 60 * 60 * 1000,
  'iat': Date.now(),
  'accessToken': accessToken
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

const cookieOptions = {
  password: process.env.COOKIE_PASSWORD,
  cookie: 'JWT-cookie',
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  ttl: 24 * 60 * 60 * 1000
};

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 8080
});

server.register([Inert, CookieAuth], (registerError) => {
  if (registerError) throw registerError;
  server.auth.strategy('session', 'cookie', cookieOptions);
  server.route([defaultRoute, ...routes]);
});

module.exports = server;
