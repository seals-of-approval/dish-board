const jwt = require('json-web-token');

const secret = process.env.CLIENT_SECRET;
const payload = {
  'typ': 'JWT',
  'sub': 'user-info',
  'exp': Date.now() + 24 * 60 * 60 * 1000,
  'iat': Date.now(),
  'accessToken': null
};
const algorithm = 'HS256';

const updatePayload = function (accessToken) {
  payload.accessToken = accessToken;
};

const encodeJWT = function (callback) {
  jwt.encode(secret, payload, algorithm, callback);
};

const decodeJWT = function (token, callback) {
  jwt.decode(secret, token, callback);
};

module.exports = {
  updatePayload,
  encodeJWT,
  decodeJWT
};
