import React from 'react';
import { Admin, Resource, CustomRoutes, memoryStore } from 'react-admin';
import { Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import * as resources from './resources';

import Layout from './layout/Layout';
import theme from './config/theme';

import HomePage from './pages/HomePage';
import RedirectPage from './pages/RedirectPage';
import PodLoginPage from './pages/PodLoginPage/PodLoginPage';

const customPodProviders = import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME && [
  {
    'apods:domainName': import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME,
    'apods:area': 'Local'
  }
];

const LoginPage = props => <PodLoginPage customPodProviders={customPodProviders} {...props} />;

const App = () => (
  <BrowserRouter>
    <Admin
      disableTelemetry
      title={import.meta.env.VITE_APP_NAME}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}
      layout={Layout}
      store={memoryStore()}
      theme={theme}
    >
      {Object.entries(resources).map(([key, resource]) => (
        <Resource key={key} name={key} {...resource.config} />
      ))}
      <CustomRoutes>
        <Route exact path="/r" element={<RedirectPage />} />,
      </CustomRoutes>
      <CustomRoutes noLayout>
        <Route exact path="/" element={<HomePage />} />,
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);

export default App;
