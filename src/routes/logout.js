module.exports = {
  path: '/logout',
  method: 'get',
  config: {
    auth: 'session',
    handler: (req, reply) => {
      req.cookieAuth.clear();
      reply.redirect('/');
    }
  }
};
