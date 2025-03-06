import urlJoin from 'url-join';
import { dataProvider, configureUserStorage, fetchAppRegistration } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import * as resources from '../resources';

const { origin: backendOrigin } = new URL(process.env.REACT_APP_BACKEND_URL);

export default dataProvider({
  dataServers,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  ontologies,
  jsonContext: ['https://www.w3.org/ns/activitystreams', urlJoin(backendOrigin, '.well-known/context.jsonld')],
  returnFailedResources: true,
  plugins: [configureUserStorage(), fetchAppRegistration()]
});
