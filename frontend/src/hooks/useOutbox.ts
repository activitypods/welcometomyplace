import { useCallback } from 'react';
import { fetchJson } from '@activitypods/refine-providers/utils';

import { authProvider } from '../providers';
import useOwnActor from './useOwnActor';
import urlJoin from '../utils/urlJoin';
import { BACKEND_URL } from '../config/env';

// Merges in the backend's own JSON-LD context, same reasoning as providers/index.ts: without the
// `interop` prefix it defines, `interop:delegationAllowed`/`interop:delegationLimit` (sent when
// granting share rights) would submit as plain string-keyed literals instead of being correctly
// typed, since the bare activitystreams context knows nothing about that vocabulary.
const DEFAULT_CONTEXT = ['https://www.w3.org/ns/activitystreams', urlJoin(new URL(BACKEND_URL).origin, '.well-known/context.jsonld')];

/**
 * Post ActivityStreams2 activities to the logged-in user's own outbox — the mechanism behind
 * joining/leaving events, sharing (Announce), and messaging (Note). Mirrors
 * `@semapps/activitypub-components`'s `useOutbox`.
 */
const useOutbox = () => {
  const { data: ownActor } = useOwnActor();
  const session = authProvider.getSession();
  const outboxUri = ownActor?.outbox;

  const post = useCallback(
    async (activity: Record<string, any>) => {
      if (!outboxUri) throw new Error('Cannot post to outbox before the user identity is loaded');
      const { headers } = await fetchJson(
        outboxUri,
        { method: 'POST', body: JSON.stringify({ '@context': DEFAULT_CONTEXT, ...activity }) },
        session?.token
      );
      return headers.get('Location');
    },
    [outboxUri, session?.token]
  );

  return { post, owner: session?.webId, url: outboxUri };
};

export default useOutbox;
