import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory } from 'history';
import { PodLoginPage, LogoutButton } from '@semapps/auth-provider';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import * as resources from './resources';

import Layout from './layout/Layout';
import theme from './config/theme';
import customRoutes from './customRoutes';

const history = createBrowserHistory();

const customPodProviders = process.env.REACT_APP_POD_PROVIDER_DOMAIN_NAME
  && [{ 'apods:domainName': process.env.REACT_APP_POD_PROVIDER_DOMAIN_NAME, 'apods:area': 'Local' }];

const LoginPage = props => <PodLoginPage customPodProviders={customPodProviders} {...props} />

const App = () => (
  <Admin
    title={process.env.REACT_APP_NAME}
    history={history}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    loginPage={LoginPage}
    logoutButton={LogoutButton}
    layout={Layout}
    theme={theme}
    customRoutes={customRoutes}
  >
    {Object.entries(resources).map(([key, resource]) => (
      <Resource key={key} name={key} {...resource.config} />
    ))}
  </Admin>
);

export default App;
