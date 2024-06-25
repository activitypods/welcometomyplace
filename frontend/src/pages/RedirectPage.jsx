import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useRedirect } from 'react-admin';
import { useDataModels } from '@semapps/semantic-data-provider';
import ontologies from '../config/ontologies.json';

const prefix = uri => {
  if (!uri.startsWith('http')) return uri; // If it is already prefixed
  const ontology = ontologies.find(o => uri.startsWith(o.url));
  return uri.replace(ontology.url, ontology.prefix + ':');
};

const RedirectPage = () => {
  const dataModels = useDataModels();
  const location = useLocation();
  const redirect = useRedirect();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (dataModels) {
      const prefixedType = prefix(searchParams.get('type'));
      const resource = Object.keys(dataModels).find(key => dataModels[key].types && dataModels[key].types.includes(prefixedType));
      if (searchParams.has('uri')) {
        redirect(searchParams.get('mode') === 'show' ? 'show' : 'edit', resource, searchParams.get('uri'));
      } else {
        redirect('list', resource);
      }
    }
  }, [dataModels, searchParams, redirect]);

  return null;
  
};

export default RedirectPage;
