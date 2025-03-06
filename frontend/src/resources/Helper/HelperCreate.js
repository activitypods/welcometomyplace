import React from 'react';
import { useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import HelperForm from './HelperForm';
import Create from '../../layout/Create';

const HelperCreate = () => {
  useCheckAuthenticated();
  const translate = useTranslate();

  return (
    <Create redirect="show" title="Se proposer comme personne ressource">
      <HelperForm />
    </Create>
  );
};

export default HelperCreate;
