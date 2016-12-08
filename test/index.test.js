const test = require('tape');
const server = require('../src/server');

test('the server is running', (t) => {
  server.start((err) => {
    if (err) {
      t.error(err);
    } else { t.pass('Server is running'); }
    server.stop();
    t.end();
  });
});
