import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useGetIdentity, useRedirect } from 'react-admin';
import theme from '../../config/theme';
import Hero from './Hero';
import Tutorial from './Tutorial';

const HomePage = () => {
  const redirect = useRedirect();
  const { data: identity, isLoading } = useGetIdentity();

  useEffect(() => {
    if (!isLoading && identity?.id) {
      redirect('list', 'Event');
    }
  }, [identity, isLoading, redirect]);

  if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <Hero />
      <Tutorial />
    </ThemeProvider>
  );
};

export default HomePage;
