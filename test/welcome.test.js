const test = require('tape');
const server = require('../src/server');

test('Check whether user has code', (t) => {
  const options = {
    method: 'GET',
    url: '/welcome'
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 404, 'You received a 404 status, test passed.');
    t.end();
  });
});
