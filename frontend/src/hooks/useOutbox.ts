import { useCallback } from 'react';
import { fetchJson } from '@activitypods/refine-providers/utils';

import { authProvider } from '../providers';
import useOwnActor from './useOwnActor';

const DEFAULT_CONTEXT = 'https://www.w3.org/ns/activitystreams';

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
