const path = require('path');
const urlJoin = require('url-join');
const { ControlledContainerMixin } = require('@semapps/ldp');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'pod-providers',
  mixins: [ControlledContainerMixin, ImporterMixin],
  settings: {
    path: '/apods/pod-provider',
    source: {
      getAllFull: path.resolve(__dirname, './files/pod-providers.json'),
      fieldsMapping: {
        slug: 'domainName'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, '/apods/pod-provider')
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
