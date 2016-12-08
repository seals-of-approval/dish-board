const Hapi = require('hapi');
const env = require('env2')('./config.env');
const routes = require('./routes.js');
const Inert = require('inert');
const Vision = require('vision');
const CookieAuth = require('hapi-auth-cookie');

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
  ttl: 24 * 60 * 60 * 1000,
  redirectTo: '/'
};

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 8080
});

server.register([Inert, CookieAuth, Vision], (registerError) => {
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: '../views',
    layoutPath: '../views/layout',
    layout: 'default'
  });

  if (registerError) throw registerError;
  server.auth.strategy('session', 'cookie', cookieOptions);
  server.route([defaultRoute, ...routes]);
});

module.exports = server;
