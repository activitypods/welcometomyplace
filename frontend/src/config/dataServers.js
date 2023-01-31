const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null, // Calculated from the token
    containers: {
      pod: {
        'as:Event': ['/events'],
        'vcard:Location': ['/locations'],
        'vcard:Individual': ['/profiles'],
        'apods:FrontAppRegistration': ['/front-apps'],
      },
    },
    uploadsContainer: '/files',
  },
  common: {
    name: 'Common data',
    baseUrl: process.env.REACT_APP_COMMON_DATA_URL,
    sparqlEndpoint: process.env.REACT_APP_COMMON_DATA_URL + 'sparql',
    default: true,
    noProxy: true,
    containers: {
      common: {
        'apods:EventFormat': ['/formats']
      },
    },
  },
};

export default dataServers;
