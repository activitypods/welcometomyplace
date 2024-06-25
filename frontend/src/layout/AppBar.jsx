import React from 'react';
import {
  Typography,
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import AppIcon from '../config/AppIcon';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
  menuButton: {
    color: 'white',
  },
  beta: {
    top: -2,
  },
  badge: {
    top: 12,
    right: -6,
  },
  title: {
    flexGrow: 1,
    marginLeft: 4,
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
}));

const AppBar = ({ title }) => {
  const classes = useStyles();
  return (
    <MuiAppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Link to="/Event">
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <AppIcon fontSize="large" />
          </IconButton>
        </Link>
        <Typography variant="h4" className={classes.title}>
          <Link to="/Event">
            {title}
          </Link>
        </Typography>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
