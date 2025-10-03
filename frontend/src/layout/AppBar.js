import React from 'react';
import { Typography, AppBar as MuiAppBar, IconButton, Toolbar, useScrollTrigger } from '@mui/material';
import { useGetIdentity } from 'react-admin';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { UserMenu } from '@activitypods/react';
import AppIcon from '../config/AppIcon';

const useStyles = makeStyles(theme => ({
  rootTransparent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    boxShadow: 'unset'
  },
  rootOpaque: {
    flexGrow: 1,
    backgroundColor: 'primary',
    backgroundImage: `radial-gradient(circle at 50% 4em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    boxShadow: 'unset'
  },
  menuButton: {
    color: 'white'
  },
  beta: {
    top: -2
  },
  badge: {
    top: 12,
    right: -6
  },
  title: {
    flexGrow: 1,
    marginLeft: 4,
    fontSize: 30,
    fontFamily: 'Chewy',
    '& a': {
      color: 'white',
      textDecoration: 'none'
    }
  }
}));

const AppBar = ({ title, opaque }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({ threshold: window.innerHeight - 64, disableHysteresis: true });
  const { data: identity } = useGetIdentity();
  return (
    <MuiAppBar className={opaque || trigger ? classes.rootOpaque : classes.rootTransparent}>
      <Toolbar>
        <Link to={identity?.id ? '/Event' : '/'}>
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <AppIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography className={classes.title}>
          <Link to={identity?.id ? '/Event' : '/'}>{title}</Link>
        </Typography>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
