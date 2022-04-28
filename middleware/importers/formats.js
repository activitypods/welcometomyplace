const path = require('path');
const urlJoin = require('url-join');
const { ImporterMixin } = require('@semapps/importer');
const CONFIG = require('../config/config');

module.exports = {
  name: 'importers.formats',
  mixins: [ImporterMixin],
  settings: {
    source: {
      getAllFull: path.resolve(__dirname, './files/formats.json'),
      fieldsMapping: {
        slug: 'label'
      },
    },
    dest: {
      containerUri: urlJoin(CONFIG.HOME_URL, 'formats')
    }
  },
  methods: {
    transform(data) {
      return({
        '@type': 'apods:EventFormat',
        'rdfs:label': data.label,
        'skos:broader': data.parent ? urlJoin(CONFIG.HOME_URL, 'formats', data.parent) : undefined
      });
    },
  }
};
