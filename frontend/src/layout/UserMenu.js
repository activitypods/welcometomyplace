import React, { forwardRef } from 'react';
import { UserMenu as RaUserMenu, MenuItemLink, useGetIdentity, useTranslate } from 'react-admin';
import { makeStyles, MenuItem, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import useOpenExternalApp from "../hooks/useOpenExternalApp";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
  active: {
    color: theme.palette.text.primary,
  },
  icon: { minWidth: theme.spacing(5) },
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

const MyProfileMenu = forwardRef(({ onClick, label, to }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<PersonIcon />} onClick={onClick} />
));

const MyAddressMenu = forwardRef(({ onClick, to, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<HomeIcon />} onClick={onClick} />
));

const MyNetworkMenu = forwardRef(({ onClick, to, label }, ref) => (
  <OutsideMenuItemLink ref={ref} to={to} primaryText={label} leftIcon={<GroupIcon />} onClick={onClick} />
));

const LoginMenu = forwardRef(({ onClick, label }, ref) => (
  <MenuItemLink ref={ref} to="/login" primaryText={label} onClick={onClick} />
));

const UserMenu = ({ logout, ...otherProps }) => {
  const { identity } = useGetIdentity();
  const openExternalApp = useOpenExternalApp();
  const translate = useTranslate();
  return (
    <RaUserMenu {...otherProps}>
      {identity && identity.id !== '' ? (
        [
          <MyProfileMenu
            key="my-profile"
            label={translate('app.page.profile')}
            to={openExternalApp('as:Profile', identity?.profileData?.id)}
          />,
          <MyAddressMenu
            key="my-address"
            label={translate('app.page.addresses')}
            to={openExternalApp('vcard:Location')}
          />,
          <MyNetworkMenu
            key="my-network"
            label={translate('app.page.network')}
            to={openExternalApp('as:Profile')}
          />,
          React.cloneElement(logout, { key: 'logout' }),
        ]
      ) : (
        <LoginMenu label={translate('ra.auth.sign_in')} />
      )}
    </RaUserMenu>
  );
};

export default UserMenu;
