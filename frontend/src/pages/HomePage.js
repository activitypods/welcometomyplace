import React, { useEffect } from 'react';
import { Box, Button, Typography, ThemeProvider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link, useGetIdentity, useTranslate, useRedirect } from 'react-admin';
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
    maxWidth: 250,
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
  const redirect = useRedirect();
  const { data: identity, isLoading } = useGetIdentity();
  const translate = useTranslate();

  useEffect(() => {
    if (!isLoading && identity?.id) {
      redirect('list', 'Event');
    }
  }, [identity, isLoading, redirect])

  if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <AppIcon className={classes.logo} />
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography align="center" className={classes.description}>
          {process.env.REACT_APP_DESCRIPTION}
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
