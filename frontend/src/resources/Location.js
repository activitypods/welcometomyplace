export default {
  dataModel: {
    types: ['vcard:Location']
  },
  translations: {
    en: {
      name: 'Address |||| Addresses',
      fields: {
        'vcard:given-name': 'Name',
        'vcard:hasAddress': 'Address',
        'vcard:note': 'Comment',
      },
    },
    fr: {
      name: 'Adresse |||| Adresses',
      fields: {
        'vcard:given-name': 'Nom du lieu',
        'vcard:hasAddress': 'Adresse',
        'vcard:note': 'Indications',
      },
    },
  },
};
