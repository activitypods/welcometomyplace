import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import createSlug from 'speakingurl';
import createDecorator from 'final-form-calculate';
import { useTranslate, useNotify, useSafeSetState } from 'react-admin';
import { useLocation } from 'react-router-dom';
import { Button, CardActions, CircularProgress, makeStyles } from '@material-ui/core';
import { useSignup } from '@semapps/auth-provider';
import DomainSelectInput from './DomainSelectInput';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    marginTop: '1em',
  },
  button: {
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const calculator = createDecorator({
  field: 'name',
  updates: {
    username: (name) => name && createSlug(name.trim(), { lang: 'fr', custom: { '.': '.' } }),
  },
});

const SignupForm = ({ redirectTo }) => {
  const [loading, setLoading] = useSafeSetState(false);
  const signup = useSignup();
  const translate = useTranslate();
  const notify = useNotify();
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const validate = (values) => {
    const errors = { email: undefined, password: undefined };

    if (!values.email) {
      errors.email = translate('ra.validation.required');
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required');
    }
    return errors;
  };

  const submit = (values) => {
    setLoading(true);
    signup({
      ...values,
      preferredLocale: process.env.REACT_APP_LANG,
      preferredFrontUrl: new URL(window.location.href).origin,
      preferredFrontName: process.env.REACT_APP_NAME
    })
      .then((webId) => {
        setTimeout(() => {
          // Reload to ensure the dataServer config is reset
          window.location.reload();
          window.location.href = redirectTo || '/';
          setLoading(false);
        }, 2000);
        notify('auth.message.new_user_created', 'info');
      })
      .catch((error) => {
        setLoading(false);
        notify(
          typeof error === 'string'
            ? error
            : typeof error === 'undefined' || !error.message
            ? 'ra.auth.sign_in_error'
            : error.message,
          'warning',
          {
            _: typeof error === 'string' ? error : error && error.message ? error.message : undefined,
          }
        );
      });
  };

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      decorators={[calculator]}
      initialValues={{
        name: searchParams.get('name'),
        email: searchParams.get('email'),
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                autoFocus
                id="name"
                name="name"
                component={TextInput}
                label={translate('auth.input.name')}
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="username"
                name="username"
                component={TextInput}
                label={translate('auth.input.username')}
                format={(value) =>
                  value
                    ? createSlug(value, {
                        lang: 'fr',
                        separator: '_',
                        custom: ['.', '-', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                      })
                    : ''
                }
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="email"
                name="email"
                component={TextInput}
                label={translate('auth.input.email')}
                format={(value) => (value ? value.toLowerCase() : '')}
                disabled={loading || (searchParams.has('email') && searchParams.has('force-email'))}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="password"
                name="password"
                component={TextInput}
                label={translate('ra.auth.password')}
                type="password"
                disabled={loading}
              />
            </div>
            {!process.env.REACT_APP_POD_PROVIDER_URL && (
              <div className={classes.input}>
                <Field
                  id="domain"
                  name="domain"
                  component={DomainSelectInput}
                  label={translate('app.input.provider')}
                  disabled={loading}
                />
              </div>
            )}
          </div>
          <CardActions>
            <Button variant="contained" type="submit" color="primary" disabled={loading} className={classes.button}>
              {loading && <CircularProgress className={classes.icon} size={18} thickness={2} />}
              {translate('auth.action.signup')}
            </Button>
          </CardActions>
        </form>
      )}
    />
  );
};

SignupForm.propTypes = {
  redirectTo: PropTypes.string,
};

export default SignupForm;
