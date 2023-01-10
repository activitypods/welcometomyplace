import { useContext, useCallback } from "react";
import PreferredAppsContext from "../context/PreferredAppsContext";

const usePreferredApp = () => {
  const preferredApps = useContext(PreferredAppsContext);
  return useCallback((type, uri, linkType = 'show') => {
    const preferredApp = Object.values(preferredApps)
      .find(app =>
        Array.isArray(app['apods:preferredForTypes'])
          ? app['apods:preferredForTypes'].includes(type)
          : app['apods:preferredForTypes'] === type
      );
    if (preferredApp) {
      const protocol = preferredApp['apods:domainName'].includes(':') ? 'http' : 'https';
      if (uri) {
        return `${protocol}://${preferredApp['apods:domainName']}/r/?type=${type}&uri=${encodeURIComponent(uri)}&mode=${linkType}`;
      } else {
        return `${protocol}://${preferredApp['apods:domainName']}/r/?type=${type}&mode=list`;
      }
    }
  }, [preferredApps])
};

export default usePreferredApp;
