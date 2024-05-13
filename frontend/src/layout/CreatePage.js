import React from 'react';
import { Container } from '@mui/material';
import HeaderTitle from './HeaderTitle';

const CreatePage = ({ title, actions, children }) => (
  <>
    <HeaderTitle actions={actions}>{title}</HeaderTitle>
    <br />
    <Container>{children}</Container>
  </>
);

export default CreatePage;
