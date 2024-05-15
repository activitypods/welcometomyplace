import React, { useEffect } from 'react';
import { useGetIdentity, useRedirect } from 'react-admin';
import { ThemeProvider } from '@mui/system';
import { StyledEngineProvider } from '@mui/material';
import PodLoginPageView from './PodLoginPageView';
import theme from '../../config/theme';

const PodLoginPage = props => {
  const { identity, isLoading } = useGetIdentity();
  const redirect = useRedirect();

  // If user is already logged in, redirect to homepage
  useEffect(() => {
    if (!isLoading && identity?.id) {
      redirect('/');
    }
  }, [identity, isLoading, redirect]);

  if (isLoading || identity?.id) return null;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <PodLoginPageView {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default PodLoginPage;
