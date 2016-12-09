const jwt = require('json-web-token');

const secret = process.env.CLIENT_SECRET;
const algorithm = 'HS256';

const encodeJWT = function (accessToken, callback) {
  const payload = {
    'typ': 'JWT',
    'sub': 'user-info',
    'exp': Date.now() + 24 * 60 * 60 * 1000,
    'iat': Date.now(),
    'accessToken': accessToken
  };
  jwt.encode(secret, payload, algorithm, callback);
};

const decodeJWT = function (token, callback) {
  jwt.decode(secret, token, callback);
};

module.exports = {
  encodeJWT,
  decodeJWT
};
