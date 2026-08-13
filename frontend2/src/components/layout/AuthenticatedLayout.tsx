import type { ReactNode } from 'react';

import AppBar, { APP_BAR_HEIGHT } from './AppBar';
import ScrollToTop from './ScrollToTop';

/**
 * Chrome around every authenticated page: the (always-opaque) app bar plus top offset for its
 * fixed height. The old app's `BackgroundChecks` wrapper (periodic app-registration/consent
 * re-check) is now handled internally by `authProvider`'s `appStatusCheckInterval` — see
 * `@activitypods/refine-providers`'s `auth-provider.ts` — so there's nothing left to do here
 * beyond the visual chrome.
 */
const AuthenticatedLayout = ({ children }: { children: ReactNode }) => (
  <>
    <ScrollToTop />
    <AppBar opaque />
    <div style={{ marginTop: APP_BAR_HEIGHT }}>{children}</div>
  </>
);

export default AuthenticatedLayout;
