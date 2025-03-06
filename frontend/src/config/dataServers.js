const dataServers = {
  common: {
    name: 'Common data',
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    noProxy: true,
    containers: [
      {
        types: ['apods:EventFormat'],
        path: '/apods/event-format'
      }
    ]
  }
};

export default dataServers;
