import React from 'react';
import { Notification, useGetList } from 'react-admin';
import { Box, ThemeProvider } from '@material-ui/core';
import AppBar from './AppBar';
import ScrollToTop from './ScrollToTop';
import PreferredAppsContext from "../context/PreferredAppsContext";

const Layout = ({ logout, theme, children, title }) => {
  const { data: frontApps } = useGetList('FrontApp');
  return (
    <ThemeProvider theme={theme}>
      <PreferredAppsContext.Provider value={frontApps}>
        <ScrollToTop />
        <AppBar title={title} logout={logout} />
        <Box>{children}</Box>
        {/* Required for react-admin optimistic update */}
        <Notification />
      </PreferredAppsContext.Provider>
    </ThemeProvider>
  );
}

export default Layout;
