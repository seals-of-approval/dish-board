const login = {
  method: 'GET',
  path: '/login',
  handler: (req, reply) => {
    reply('Hello');
  }
};

module.exports = login;
