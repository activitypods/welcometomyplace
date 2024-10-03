const path = require('path');
const urlJoin = require('url-join');
const { ControlledContainerMixin } = require('@semapps/ldp');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../../config/config');

module.exports = {
  name: 'formats',
  mixins: [ControlledContainerMixin, ImporterMixin],
  settings: {
    path: '/apods/event-format',
    source: {
      getAllFull: path.resolve(__dirname, `./files/formats-${CONFIG.APP_LANG}.json`),
      fieldsMapping: {
        slug: 'label'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, '/apods/event-format')
    }
  },
  methods: {
    transform(data) {
      return({
        '@type': 'apods:EventFormat',
        'rdfs:label': data.label,
        'skos:broader': data.parent ? urlJoin(CONFIG.HOME_URL, data.parent) : undefined
      });
    },
  }
};
