import { Authenticated, Refine } from '@refinedev/core';
import { useNotificationProvider, ErrorComponent } from '@refinedev/antd';
import routerProvider, { CatchAllNavigate, UnsavedChangesNotifier } from '@refinedev/react-router';
import { AntdAuthPage } from '@activitypods/refine-providers/antd-auth-page';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { App as AntdApp, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';

import '@refinedev/antd/dist/reset.css';
import './index.css';

import { authProvider, dataProvider, formatDataProvider } from './providers';
import { i18nProvider } from './i18n';
import { APP_LANG, DEFAULT_POD_PROVIDER } from './config/env';
import theme from './theme';
import AuthenticatedLayout from './components/layout/AuthenticatedLayout';
import HomePage from './pages/HomePage';
import EventListPage from './pages/EventListPage';
import EventShowPage from './pages/EventShowPage';

const antdLocale = APP_LANG === 'fr' ? frFR : enUS;

const App = () => (
  <BrowserRouter>
    <ConfigProvider locale={antdLocale} theme={theme}>
      <AntdApp>
        <Refine
          authProvider={authProvider}
          dataProvider={{ default: dataProvider, appServer: formatDataProvider }}
          routerProvider={routerProvider}
          i18nProvider={i18nProvider}
          resources={[
            { name: 'event', list: '/events', show: '/events/:id', create: '/events/create', edit: '/events/:id/edit' },
            { name: 'location' },
            { name: 'profile' },
            { name: 'group' },
            { name: 'format', list: '/formats', show: '/formats/:id', meta: { dataProviderName: 'appServer' } }
          ]}
          notificationProvider={useNotificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            disableTelemetry: true
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/*
              Not wrapped in <Authenticated>: AntdAuthPage handles every stage (provider picker,
              OAuth callback, app registration) from the URL's search params, so this single
              route doubles as the OIDC redirectUri (defaults to `${origin}/login`).
            */}
            <Route
              path="/login"
              element={<AntdAuthPage authProvider={authProvider} defaultPodProvider={DEFAULT_POD_PROVIDER} redirect="/events" />}
            />

            <Route
              element={
                <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                  <Outlet />
                </Authenticated>
              }
            >
              <Route path="/events" element={<EventListPage />} />
              <Route path="/events/:id" element={<EventShowPage />} />
            </Route>

            <Route
              element={
                <Authenticated key="catch-all">
                  <AuthenticatedLayout>
                    <Outlet />
                  </AuthenticatedLayout>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  </BrowserRouter>
);

export default App;
