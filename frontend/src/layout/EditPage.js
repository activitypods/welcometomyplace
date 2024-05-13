import React from 'react';
import { useEditContext } from 'react-admin';
import { Container } from '@mui/material';
import HeaderTitle from './HeaderTitle';

const EditPage = ({ title, actions, children }) => {
  const { defaultTitle } = useEditContext();
  return (
    <>
      <HeaderTitle actions={actions}>
        {title || defaultTitle}
      </HeaderTitle>
      <br />
      <Container>
        {children}
      </Container>
    </>
  );
};

export default EditPage;
