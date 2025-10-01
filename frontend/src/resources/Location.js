import urlJoin from 'url-join';

export default {
  dataModel: {
    shapeTreeUri: urlJoin(process.env.REACT_APP_SHAPE_REPOSITORY_URL, 'shapetrees/vcard/Location')
  },
  translations: {
    en: {
      name: 'Address |||| Addresses',
      fields: {
        'vcard:given-name': 'Name',
        'vcard:hasAddress': 'Address',
        'vcard:note': 'Comment'
      }
    },
    fr: {
      name: 'Adresse |||| Adresses',
      fields: {
        'vcard:given-name': 'Nom du lieu',
        'vcard:hasAddress': 'Adresse',
        'vcard:note': 'Indications'
      }
    }
  }
};
