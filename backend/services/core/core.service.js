const path = require('path');
const { CoreService } = require('@semapps/core');
const { apods, notify, interop, oidc, skos } = require('@semapps/ontologies');
const CONFIG = require('../../config/config');

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '../..'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET
    },
    ontologies: [apods, notify, interop, oidc, skos],
    activitypub: {
      queueServiceUrl: CONFIG.QUEUE_SERVICE_URL
    },
    api: {
      port: CONFIG.PORT
    },
    ldp: {
      resourcesWithContainerPath: false
    },
    void: false
  }
};
