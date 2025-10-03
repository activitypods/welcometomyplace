import React from 'react';
import { useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import FormatForm from './FormatForm';
import Create from '../../layout/Create';

const FormatCreate = () => {
  useCheckAuthenticated();
  const translate = useTranslate();

  return (
    <Create redirect="show">
      <FormatForm />
    </Create>
  );
};

export default FormatCreate;
