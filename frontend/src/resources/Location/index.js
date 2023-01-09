import PlaceIcon from '@material-ui/icons/Place';

export default {
  config: {
    icon: PlaceIcon,
    options: {
      label: 'Adresses',
    },
  },
  dataModel: {
    types: ['vcard:Location'],
    list: {
      servers: 'pod',
      dereference: ['vcard:hasAddress/vcard:hasGeo'],
    },
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
