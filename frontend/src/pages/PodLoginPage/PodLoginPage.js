import React from 'react';
import { ThemeProvider } from '@mui/system';
import { StyledEngineProvider } from '@mui/material';
import PodLoginPageView from './PodLoginPageView';
import theme from '../../config/theme';

const PodLoginPage = props => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <PodLoginPageView {...props} />
    </ThemeProvider>
  </StyledEngineProvider>
);

export default PodLoginPage;
