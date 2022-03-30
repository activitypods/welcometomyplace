import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Notification, useGetIdentity, useTranslate } from 'react-admin';
import { Card, Avatar, makeStyles, createTheme, ThemeProvider, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
  },
  card: {
    minWidth: 300,
    marginTop: '6em',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2em',
    },
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary[500],
  },
  switch: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const LocalLoginPage = (props) => {
  const { theme, title, classes: classesOverride, className, history, location, match, ...rest } = props;
  const classes = useStyles(props);
  const muiTheme = useMemo(() => createTheme(theme), [theme]);
  const searchParams = new URLSearchParams(location.search);
  const isSignup = searchParams.has('signup');
  searchParams.delete('signup'); // Delete parameter so that it doesn't appear on the links below
  const redirectTo = searchParams.get('redirect');
  const { identity, loading } = useGetIdentity();
  const translate = useTranslate();

  if (loading) {
    return null;
  } else if (identity?.id) {
    const currentUrl = new URL(window.location.href).origin;
    if( redirectTo ) {
      if( redirectTo.startsWith(currentUrl) ) {
        window.location.href = redirectTo;
        return null;
      } else if ( redirectTo.startsWith('/') ) {
        return <Redirect to={redirectTo} />;
      } else if ( redirectTo.startsWith('http') ) {
        // Distant application
        // TODO ensure that it is an authorized application as we are passing down the token allowing to identify the user

        const token = localStorage.getItem('token');
        const url = new URL(redirectTo);
        url.searchParams.set('token', token);
        window.location.href = url.toString();

        return null;
      }
    } else {
      // Do not show login page if user is already connected
      return <Redirect to="/" />;
    }
  } else {
    return (
      <ThemeProvider theme={muiTheme}>
        <div className={classnames(classes.main, className)} {...rest}>
          <Card className={classes.card}>
            <div className={classes.avatar}>
              <Avatar className={classes.icon}>
                <LockIcon />
              </Avatar>
            </div>
            {isSignup ? <SignupForm redirectTo={redirectTo} /> : <LoginForm redirectTo={redirectTo} />}
            <div className={classes.switch}>
              {isSignup ? (
                <Link to={'/login?' + searchParams.toString()}>
                  <Typography variant="body2">{translate('app.action.login')}</Typography>
                </Link>
              ) : (
                <Link to={'/login?signup=true&' + searchParams.toString()}>
                  <Typography variant="body2">{translate('app.action.signup')}</Typography>
                </Link>
              )}
            </div>
          </Card>
          <Notification />
        </div>
      </ThemeProvider>
    );
  }
};

LocalLoginPage.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object,
};

export default LocalLoginPage;
