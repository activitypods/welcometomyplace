import { useMemo } from 'react';
import { useGetIdentity } from 'react-admin';

const usePodProviderLink = (type, param) => {
  const { identity } = useGetIdentity();

  const domainName = useMemo(() => {
    if (identity) {
       return (new URL(identity)).host;
    }
  }, [identity])

  if (domainName) {
    switch(type) {
      case 'edit_profile':
        return domainName;
    }
  }
};

export default usePodProviderLink;
