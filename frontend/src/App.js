import React from 'react';
import { Admin, Resource, CustomRoutes, memoryStore } from 'react-admin';
import { Route, BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { LoginPage, RedirectPage } from '@activitypods/react';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import * as resources from './resources';

import Layout from './layout/Layout';
import theme from './config/theme';
import ontologies from './config/ontologies.json';

import HomePage from './pages/HomePage';

const MyLoginPage = props => (
  <LoginPage
    customPodProviders={
      process.env.REACT_APP_POD_PROVIDER_BASE_URL && [
        { 'apods:baseUrl': process.env.REACT_APP_POD_PROVIDER_BASE_URL, 'apods:area': 'Local server' }
      ]
    }
    clientId={process.env.REACT_APP_BACKEND_CLIENT_ID}
    {...props}
  />
);

const App = () => (
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <Admin
        disableTelemetry
        title={process.env.REACT_APP_NAME}
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        loginPage={MyLoginPage}
        layout={Layout}
        theme={theme}
        store={memoryStore()}
      >
        {Object.entries(resources).map(([key, resource]) => (
          <Resource key={key} name={key} {...resource.config} />
        ))}
        <CustomRoutes>
          <Route exact path="/r" element={<RedirectPage ontologies={ontologies} />} />,
        </CustomRoutes>
        <CustomRoutes noLayout>
          <Route exact path="/" element={<HomePage />} />,
        </CustomRoutes>
      </Admin>
    </BrowserRouter>
  </StyledEngineProvider>
);

export default App;
