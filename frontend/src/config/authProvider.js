import { authProvider } from '@semapps/auth-provider';
import dataProvider from "./dataProvider";

export default authProvider({
  dataProvider,
  allowAnonymous: true,
  authType: 'pod',
  checkPermissions: true,
});
