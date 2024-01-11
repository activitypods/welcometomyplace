import React from 'react';
import { Box, Button, makeStyles, Typography, ThemeProvider } from '@material-ui/core';
import { Link, useGetIdentity, useTranslate } from 'react-admin';
import { Redirect } from 'react-router-dom';
import AppIcon from '../config/AppIcon';
import theme from '../config/theme';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
  title: {
    lineHeight: 1,
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8em'
    },
  },
  description: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: 16,
    whiteSpace: 'pre-line',
  },
  link: {
    textDecoration: 'underline',
    color: 'white'
  },
  text: {
    color: 'white',
  },
  logo: {
    fontSize: 100,
    color: 'white',
  },
  button: {
    margin: 5,
  },
}));

const HomePage = ({ title }) => {
  const classes = useStyles();
  const { loading, identity } = useGetIdentity();
  const translate = useTranslate();

  if (loading) return null;

  return identity?.id ? (
    <Redirect to="/Event" />
  ) : (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <AppIcon className={classes.logo} />
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography align="center" className={classes.description}>
          {translate('app.description_short')}
        </Typography>
        {process.env.REACT_APP_ORGANIZATION_NAME &&
          <a href={process.env.REACT_APP_ORGANIZATION_URL} target="_blank" rel="noopener noreferrer" className={classes.link}>
            <Typography align="center" className={classes.description}>
              {translate('app.backed_by_organization', { organizationName: process.env.REACT_APP_ORGANIZATION_NAME})}
            </Typography>
          </a>
        }
        <Box display="flex" pt={2} pb={1} alignItems="center">
          <Link to="/login?signup">
            <Button variant="contained" color="secondary" className={classes.button}>
              {translate('auth.action.signup')}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="contained" color="secondary" className={classes.button}>
              {translate('ra.auth.sign_in')}
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
