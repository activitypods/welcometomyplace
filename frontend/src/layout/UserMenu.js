import React, { forwardRef } from 'react';
import urlJoin from 'url-join';
import { UserMenu as RaUserMenu, Logout, MenuItemLink, useGetIdentity, useTranslate } from 'react-admin';
import { MenuItem, ListItemIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StorageIcon from '@mui/icons-material/Storage';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import useOpenExternalApp from '../hooks/useOpenExternalApp';
import { useNodeinfo } from '@semapps/activitypub-components';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary
  },
  active: {
    color: theme.palette.text.primary
  },
  icon: { minWidth: theme.spacing(5) }
}));

const OutsideMenuItemLink = ({ to, primaryText, leftIcon }) => {
  const classes = useStyles();
  return (
    <a href={to}>
      <MenuItem className={classes.root} activeClassName={classes.active}>
        <ListItemIcon className={classes.icon}>{leftIcon}</ListItemIcon>
        {primaryText}
      </MenuItem>
    </a>
  );
};

const MyNetworkMenu = forwardRef(({ onClick, to, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<PeopleAltIcon />} onClick={onClick} />
));

const MyApplicationsMenu = forwardRef(({ onClick, to, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<AppsIcon />} onClick={onClick} />
));

const MyDataMenu = forwardRef(({ onClick, label, to }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<StorageIcon />} onClick={onClick} />
));

const SettingsMenu = forwardRef(({ onClick, to, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<SettingsIcon />} onClick={onClick} />
));

const LoginMenu = forwardRef(({ onClick, label }, ref) => (
  <MenuItemLink ref={ref} to="/login" primaryText={label} onClick={onClick} />
));

const UserMenu = ({ logout, ...otherProps }) => {
  const { data: identity } = useGetIdentity();
  const nodeinfo = useNodeinfo(new URL(identity?.webIdData?.['solid:oidcIssuer']).host);
  const translate = useTranslate();
  return (
    <RaUserMenu {...otherProps}>
      {identity?.id !== '' ? (
        [
          nodeinfo && (
            <MyNetworkMenu
              key="my-network"
              label={translate('app.page.network')}
              to={urlJoin(nodeinfo?.metadata?.frontend_url, 'network')}
            />
          ),
          nodeinfo && (
            <MyApplicationsMenu
              key="my-apps"
              label={translate('app.page.apps')}
              to={urlJoin(nodeinfo?.metadata?.frontend_url, 'apps')}
            />
          ),
          nodeinfo && (
            <MyDataMenu
              key="my-data"
              label={translate('app.page.data')}
              to={urlJoin(nodeinfo?.metadata?.frontend_url, 'data')}
            />
          ),
          nodeinfo && (
            <SettingsMenu
              key="settings"
              label={translate('app.page.settings')}
              to={urlJoin(nodeinfo?.metadata?.frontend_url, 'data')}
            />
          ),
          <Logout key="logout" />
        ]
      ) : (
        <LoginMenu label={translate('ra.auth.sign_in')} />
      )}
    </RaUserMenu>
  );
};

export default UserMenu;
