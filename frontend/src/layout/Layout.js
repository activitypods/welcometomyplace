import React from 'react';
import { Notification } from 'react-admin';
import { Box, ThemeProvider } from '@material-ui/core';
import AppBar from './AppBar';
import ScrollToTop from './ScrollToTop';

const Layout = ({ logout, theme, children, title }) => (
  <ThemeProvider theme={theme}>
      <ScrollToTop />
      <AppBar title={title} logout={logout} />
      <Box>{children}</Box>
      {/* Required for react-admin optimistic update */}
      <Notification />
  </ThemeProvider>
);

export default Layout;
