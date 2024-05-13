import React, { forwardRef } from 'react';
import { UserMenu as RaUserMenu, Logout, MenuItemLink, useGetIdentity, useTranslate } from 'react-admin';
import { MenuItem, ListItemIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
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
  const { data: identity } = useGetIdentity();
  const openExternalApp = useOpenExternalApp();
  const translate = useTranslate();
  return (
    <RaUserMenu {...otherProps}>
      {identity?.id !== '' ? (
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
          <Logout key="logout" />
        ]
      ) : (
        <LoginMenu label={translate('ra.auth.sign_in')} />
      )}
    </RaUserMenu>
  );
};

export default UserMenu;
