module.exports = {
  path: '/logout',
  method: 'GET',
  config: {
    auth: 'session',
    handler: (req, reply) => {
      req.cookieAuth.clear();
      reply.redirect('/');
    }
  }
};
