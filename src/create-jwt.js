const jwt = require('json-web-token');

const secret = process.env.CLIENT_SECRET;
let payload;

const setPayload = function(accessToken) {
  payload = {
    'typ': 'JWT',
    'sub': 'user-info',
    'exp': Date.now() + 24 * 60 * 60 * 1000,
    'iat': Date.now(),
    'accessToken': accessToken
  };
};

const algorithm = 'HS256';

const encodeJWT = function(callback) {
  jwt.encode(secret, payload, algorithm, callback);
};

module.exports = {
  setPayload,
  encodeJWT
};
