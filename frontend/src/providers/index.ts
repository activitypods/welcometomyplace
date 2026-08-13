import { authProvider as apAuthProvider, dataProvider as apDataProvider } from '@activitypods/refine-providers';
import urlJoin from '../utils/urlJoin';
import { BACKEND_URL, CLIENT_ID, SHAPE_REPOSITORY_URL } from '../config/env';
import appServerDataProvider from './appServerDataProvider';

export const authProvider = apAuthProvider({
  clientId: CLIENT_ID,
  // Must match the redirect_uris the backend registers this app's OIDC client with (see
  // `backend/services/app.service.js`'s `oidc.redirectUris`) — it's `{FRONT_URL}/auth-callback`,
  // not the package's own `/login` default, and the backend isn't ours to change.
  redirectUri: urlJoin(window.location.origin, 'auth-callback')
});

/** Resources living on the logged-in user's own Pod, discovered via shape trees. */
export const dataProvider = apDataProvider({
  authProvider,
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
