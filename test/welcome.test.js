const test = require('tape');
const server = require('../src/server');

test('Check the welcome route redirects when not logged in', (t) => {
  const options = {
    method: 'GET',
    url: '/welcome'
  };
  myToken = null;
  server.inject(options, (response) => {
    t.equal(response.statusCode, 302, 'You received a 302 status code and were redirected, test passed.');
    t.end();
  });
});
