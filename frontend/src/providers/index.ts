import { authProvider as apAuthProvider, dataProvider as apDataProvider } from '@activitypods/refine-providers';
import urlJoin from '../utils/urlJoin';
import { BACKEND_URL, CLIENT_ID, SHAPE_REPOSITORY_URL } from '../config/env';
import appServerDataProvider from './appServerDataProvider';

export const authProvider = apAuthProvider({
  clientId: CLIENT_ID
});

/** Merges in the backend's own JSON-LD context (`apods`, `interop`, `skos`... prefixes, with
 *  reference properties like `apods:hasFormat` correctly typed `@type: "@id"`), matching the old
 *  app's `dataProvider.js`. Without it, `apods:`-prefixed reference fields still get submitted,
 *  but as plain string literals rather than resource links — silently unusable server-side. */
const JSON_CONTEXT = ['https://www.w3.org/ns/activitystreams', urlJoin(new URL(BACKEND_URL).origin, '.well-known/context.jsonld')];

/** Resources living on the logged-in user's own Pod, discovered via shape trees. */
export const dataProvider = apDataProvider({
  authProvider,
  jsonContext: JSON_CONTEXT,
  resources: {
    event: {
      shapeTreeUri: urlJoin(SHAPE_REPOSITORY_URL, 'shapetrees/as/Event')
    },
    location: {
      shapeTreeUri: urlJoin(SHAPE_REPOSITORY_URL, 'shapetrees/vcard/Location')
    },
    profile: {
      shapeTreeUri: urlJoin(SHAPE_REPOSITORY_URL, 'shapetrees/as/Profile')
    },
    group: {
      shapeTreeUri: urlJoin(SHAPE_REPOSITORY_URL, 'shapetrees/vcard/Group')
    }
  }
});

/** Resources hosted on the app's own backend (public catalog), not on the user's Pod. */
export const formatDataProvider = appServerDataProvider({
  authProvider,
  resources: {
    format: {
      containerUri: urlJoin(BACKEND_URL, 'apods/event-format'),
      types: 'apods:EventFormat'
    }
  }
});
