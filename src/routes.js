const login = require('./routes/login');
const welcome = require('./routes/welcome');
const profile = require('./routes/profile');
const logout = require('./routes/logout');

module.exports = [
  login,
  welcome,
  profile,
  logout
];
