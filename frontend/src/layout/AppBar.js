import React from 'react';
import { Typography, AppBar as MuiAppBar, IconButton, Toolbar, useScrollTrigger } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { UserMenu } from '@activitypods/react';
import AppIcon from '../config/AppIcon';

const useStyles = makeStyles(() => ({
  rootTransparent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    boxShadow: 'unset'
  },
  rootOpaque: {
    backgroundImage: 'url("/images/background.png")',
    backgroundPosition: 'center bottom -150px',
    backgroundSize: 'cover',
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

const AppBar = ({ title }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({ threshold: window.innerHeight - 64, disableHysteresis: true });
  return (
    <MuiAppBar className={trigger ? classes.rootOpaque : classes.rootTransparent}>
      <Toolbar>
        <Link to="/Event">
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <AppIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography className={classes.title}>
          <Link to="/Event">{title}</Link>
        </Typography>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
