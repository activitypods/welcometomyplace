import { authProvider } from '@semapps/auth-provider';
import dataProvider from "./dataProvider";

export default authProvider({
  dataProvider,
  authType: 'solid-oidc',
  allowAnonymous: true,
  checkPermissions: true,
  clientId: process.env.REACT_APP_BACKEND_CLIENT_ID
});
