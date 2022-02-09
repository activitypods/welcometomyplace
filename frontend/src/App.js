import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createBrowserHistory } from 'history';
import jwtDecode from 'jwt-decode';
import { LogoutButton } from '@semapps/auth-provider';

import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import * as resources from './resources';

import Layout from './layout/Layout';
import theme from './config/theme';
import LocalLoginPage from './pages/LocalLoginPage/LocalLoginPage';
import customRoutes from './customRoutes';

const history = createBrowserHistory();

const App = () => {
  // If user has an old token, disconnect him
  const token = localStorage.getItem('token');
  if (token) {
    const { webId } = jwtDecode(token);
    if (webId.startsWith(process.env.REACT_APP_COMMON_DATA_URL + 'users/')) {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }
  return (
    <Admin
      title={process.env.REACT_APP_NAME}
      history={history}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={LocalLoginPage}
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
};

export default App;
