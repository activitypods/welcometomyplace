import React from 'react';
import { Notification } from 'react-admin';
import { Box, ThemeProvider } from '@mui/material';
import AppBar from './AppBar';
import ScrollToTop from './ScrollToTop';
import theme from '../config/theme';

const Layout = ({ logout, children, title }) => (
  <ThemeProvider theme={theme}>
      <ScrollToTop />
      <AppBar title={title} logout={logout} />
      <Box>{children}</Box>
      {/* Required for react-admin optimistic update */}
      <Notification />
  </ThemeProvider>
);

export default Layout;
