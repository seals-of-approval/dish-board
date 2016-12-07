const jwt = require('json-web-token');
// const accessToken = '191f179355b4e4f1514a66d747986e932985c735';

module.exports = (accessToken) => {
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
};
