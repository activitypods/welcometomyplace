import React from 'react';
import { Box } from '@mui/material';
import { BackgroundChecks } from '@activitypods/react';
import AppBar from './AppBar';
import ScrollToTop from './ScrollToTop';
import { useGetIdentity } from 'react-admin';

const Layout = ({ children, title }) => {
  const { data: identity, isLoading } = useGetIdentity();
  if (isLoading) return null;
  return (
    <BackgroundChecks
      clientId={process.env.REACT_APP_BACKEND_CLIENT_ID}
      listeningTo={[identity?.webIdData.inbox, identity?.webIdData.outbox]}
    >
      <ScrollToTop />
      <AppBar title={title} />
      <Box>{children}</Box>
    </BackgroundChecks>
  );
};

export default Layout;
