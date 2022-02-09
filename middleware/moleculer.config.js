const CONFIG = require('./config/config');

const redisConfig = {
  type: 'Redis',
  options: {
    prefix: 'action',
    ttl: 2592000, // Keep in cache for one month
    redis: CONFIG.REDIS_CACHE_URL
  }
};

module.exports = {
  // You can set all ServiceBroker configurations here
  // See https://moleculer.services/docs/0.14/configuration.html
  cacher: CONFIG.REDIS_CACHE_URL ? redisConfig : undefined
};
