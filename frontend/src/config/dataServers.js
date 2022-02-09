const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null,
    containers: {
      pod: {
        'as:Event': ['/events'],
        'vcard:Location': ['/locations'],
        'vcard:Individual': ['/profiles'],
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
        'apods:EventFormat': ['/formats'],
        'apods:PodProvider': ['/pod-providers'],
      },
    },
  },
};

export default dataServers;
