import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@activitypods/refine-providers/utils';

import { authProvider } from '../providers';

export type ActorProfile = {
  'vcard:given-name'?: string;
  'vcard:photo'?: string;
  [key: string]: any;
};

/**
 * Resolve an Actor (WebID) URI to its Profile — the actor document only carries a `url` link to
 * the actual Profile resource that has the display name/photo (`vcard:given-name`/`vcard:photo`).
 * Used for event organizers and attendees, wherever only the Actor URI is available (e.g. from
 * `dc:creator` or an `apods:attendees` collection item).
 */
const useActorProfile = (actorUri?: string) => {
  const session = authProvider.getSession();

  return useQuery({
    queryKey: ['actor-profile', actorUri],
    queryFn: async () => {
      const { json: actor } = await fetchJson(actorUri!, {}, session?.token);
      if (!actor.url) return null;
      const { json: profile } = await fetchJson(actor.url, {}, session?.token);
      return profile as ActorProfile;
    },
    enabled: !!actorUri,
    staleTime: 5 * 60 * 1000
  });
};

export default useActorProfile;
