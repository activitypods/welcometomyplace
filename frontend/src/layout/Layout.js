import React from 'react';
import { Box } from '@mui/material';
import { BackgroundChecks } from '@activitypods/react';
import AppBar from './AppBar';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children, title }) => (
  <BackgroundChecks>
    <ScrollToTop />
    <AppBar title={title} />
    <Box>{children}</Box>
  </BackgroundChecks>
);

export default Layout;
