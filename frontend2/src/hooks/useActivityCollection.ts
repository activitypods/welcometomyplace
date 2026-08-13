import { useQuery, useQueryClient } from '@tanstack/react-query';
import { arrayOf, fetchJson } from '@activitypods/refine-providers/utils';

import { authProvider } from '../providers';
import useOwnActor from './useOwnActor';

/**
 * Read an ActivityPub (Ordered)Collection: either a full URI, or a predicate (e.g.
 * `apods:contacts`) resolved against the logged-in user's own actor document — mirrors
 * `@semapps/activitypub-components`'s `useCollection`, minus the infinite-scroll/live-update
 * machinery this app doesn't need (attendee/announce/contact lists here are small and bounded:
 * a single page fetch is enough, following the collection's `first` page if it has one).
 */
const useActivityCollection = (predicateOrUri?: string) => {
  const { data: ownActor } = useOwnActor();
  const session = authProvider.getSession();
  const queryClient = useQueryClient();

  const isUri = predicateOrUri?.startsWith('http');
  const collectionUri = isUri ? predicateOrUri : predicateOrUri ? ownActor?.[predicateOrUri] : undefined;

  const queryKey = ['activity-collection', collectionUri];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      let { json } = await fetchJson(collectionUri!, {}, session?.token);

      if ((json.type === 'OrderedCollection' || json.type === 'Collection') && json.first) {
        const firstItems = json.first?.items || json.first?.orderedItems;
        if (!firstItems) {
          ({ json } = await fetchJson(typeof json.first === 'string' ? json.first : json.first.id, {}, session?.token));
        } else {
          json = json.first;
        }
      }

      const items: string[] = arrayOf(json.orderedItems || json.items).map((item: any) => item.id || item);
      return items;
    },
    enabled: !!collectionUri && !!session
  });

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    url: collectionUri,
    /** Optimistically add an item to the cached collection, without waiting for a refetch. */
    addItem: (item: string) => {
      queryClient.setQueryData<string[]>(queryKey, old => (old ? [item, ...old] : [item]));
    },
    /** Optimistically remove an item from the cached collection, without waiting for a refetch. */
    removeItem: (item: string) => {
      queryClient.setQueryData<string[]>(queryKey, old => old?.filter(i => i !== item));
    }
  };
};

export default useActivityCollection;
