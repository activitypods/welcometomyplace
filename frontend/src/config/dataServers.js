const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null, // Calculated from the token
    containers: {
      pod: {
        'as:Event': ['/as/event'],
        'vcard:Location': ['/vcard/location'],
        'vcard:Individual': ['/vcard/individual'],
        'vcard:Group': ['/vcard/group']
      }
    },
    uploadsContainer: '/semapps/file'
  },
  app: {
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    default: true,
    containers: {
      app: {
        'apods:EventFormat': ['/apods/event-format']
      }
    },
    void: false,
    uploadsContainer: '/semapps/file'
  }
};

export default dataServers;
