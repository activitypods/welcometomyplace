const path = require('path');
const urlJoin = require('url-join');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importers.pod-providers',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/pod-providers.json'),
      fieldsMapping: {
        slug: 'domainName'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'pod-providers')
    }
  },
  methods: {
    transform(data) {
      return({
        '@type': 'apods:PodProvider',
        'apods:domainName': data.domainName,
        'apods:area': data.area,
      });
    },
  }
};
