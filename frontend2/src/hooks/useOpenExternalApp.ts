import { useCallback } from 'react';
import { useGetIdentity } from '@refinedev/core';

import urlJoin from '../utils/urlJoin';
import type { Identity } from '../types';

/**
 * Every Pod exposes `{webId}/openApp?type=...&uri=...&mode=...`, which looks up whichever app is
 * registered for that resource type and redirects there. Used to deep-link to the Pod provider's
 * own frontend for profile editing/viewing, since this app has no in-app profile page.
 */
const useOpenExternalApp = () => {
  const { data: identity } = useGetIdentity<Identity>();

  return useCallback(
    (type: string, uri?: string, mode?: string) => {
      if (!identity?.id) return undefined;
      const searchParams = new URLSearchParams();
      if (type) searchParams.set('type', type);
      if (uri) searchParams.set('uri', uri);
      if (mode) searchParams.set('mode', mode);
      return `${urlJoin(identity.id, 'openApp')}?${searchParams.toString()}`;
    },
    [identity]
  );
};

export default useOpenExternalApp;
