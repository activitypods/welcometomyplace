import urlJoin from 'url-join';
import { dataProvider } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import * as resources from '../resources';

export default dataProvider({
  dataServers,
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  ontologies,
  jsonContext: ["https://www.w3.org/ns/activitystreams", urlJoin(process.env.REACT_APP_BACKEND_URL, '.well-known/context.jsonld') ],
  returnFailedResources: true,
});
