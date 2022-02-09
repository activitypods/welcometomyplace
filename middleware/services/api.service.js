const ApiGatewayService = require('moleculer-web');
const CONFIG = require('../config/config');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      exposedHeaders: '*'
    },
    httpServerTimeout: 300000,
    port: CONFIG.PORT
  }
};
