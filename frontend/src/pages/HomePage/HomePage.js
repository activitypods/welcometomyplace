import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useGetIdentity, useRedirect } from 'react-admin';
import theme from '../../config/theme';
import Hero from './Hero';
import Tutorial from './Tutorial';
import AppBar from '../../layout/AppBar';
import FeaturedFormats from './FeaturedFormats';

const HomePage = () => {
  const redirect = useRedirect();
  const { data: identity, isLoading } = useGetIdentity();

  // useEffect(() => {
  //   if (!isLoading && identity?.id) {
  //     redirect('list', 'Event');
  //   }
  // }, [identity, isLoading, redirect]);

  // if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <AppBar title={process.env.REACT_APP_NAME} />
      <Hero />
      <Tutorial />
      <FeaturedFormats />
    </ThemeProvider>
  );
};

export default HomePage;
