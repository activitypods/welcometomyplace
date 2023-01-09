export default {
  config: {
    options: {
      label: 'Personnes',
    },
  },
  dataModel: {
    types: ['vcard:Individual'],
    list: {},
  },
  translations: {
    en: {
      name: 'Profile |||| Profiles',
      fields: {
        'vcard:given-name': 'Surname',
        'vcard:family-name': 'Family name',
        'vcard:note': 'About you',
        'vcard:photo': 'Picture',
        'vcard:hasAddress': 'Address',
        'foaf:tipjar': 'G1 account'
      },
    },
    fr: {
      name: 'Profil |||| Profils',
      fields: {
        'vcard:given-name': 'Prénom',
        'vcard:family-name': 'Nom de famille',
        'vcard:note': 'En deux mots',
        'vcard:photo': 'Photo',
        'vcard:hasAddress': 'Adresse',
        'foaf:tipjar': 'Compte G1'
      },
    },
  },
};
