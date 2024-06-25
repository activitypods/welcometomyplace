const dataServers = {
  pod: {
    pod: true,
    default: true,
    authServer: true,
    baseUrl: null, // Calculated from the token
    sparqlEndpoint: null, // Calculated from the token
    containers: {
      pod: {
        "as:Event": ["/as/event"],
        "vcard:Location": ["/vcard/location"],
        "vcard:Individual": ["/vcard/individual"],
        "vcard:Group": ["/vcard/group"],
      },
    },
    uploadsContainer: "/semapps/file",
  },
  common: {
    name: "Common data",
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    default: true,
    noProxy: true,
    containers: {
      common: {
        "apods:EventFormat": ["/apods/event-format"],
      },
    },
    void: false,
  },
};

export default dataServers;
