const Hapi = require('hapi');
const Inert = require('inert');
const CookieAuth = require('hapi-auth-cookie');
const server = new Hapi.Server();

const routes = require('./routes.js');

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
