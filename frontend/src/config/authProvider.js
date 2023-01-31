import { authProvider } from '@semapps/auth-provider';
import dataProvider from "./dataProvider";

export default authProvider({
  dataProvider,
  allowAnonymous: true,
  localAccounts: true,
  checkPermissions: true,
});
