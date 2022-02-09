import React, { useCallback } from 'react';
import { useNotify, useQueryWithStore, useRefresh, useTranslate } from 'react-admin';
import { Button, makeStyles, Card, Avatar, Grid, Typography, Box, useMediaQuery } from '@material-ui/core';
import { useCollection, useOutbox, ACTIVITY_TYPES } from '@semapps/activitypub-components';
import { formatUsername } from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 5,
    marginBottom: 24,
  },
  title: {
    borderBottom: '1px lightgrey solid',
    padding: 12,
  },
  list: {
    padding: 10,
    paddingLeft: 70,
    position: 'relative',
    height: 55,
    [theme.breakpoints.down('sm')]: {
      height: 105,
    },
  },
  name: {
    fontWeight: 'bold',
    lineHeight: 2,
    marginRight: 6,
  },
  avatar: {
    width: 50,
    height: 50,
    left: 12,
    top: 12,
    position: 'absolute',
  },
  button: {
    margin: 6,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      marginRight: 6,
    },
  },
}));

const ContactRequest = ({ activity, accept, reject, ignore }) => {
  const classes = useStyles();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const translate = useTranslate();

  let { loading, data: profile } = useQueryWithStore({
    type: 'getOne',
    resource: 'Profile',
    payload: { id: activity.object.object },
  });

  if (loading) return null;

  const message = activity.content || (activity.context ? translate('app.message.you_participated_to_same_event') : '');

  return (
    <>
      <Avatar src={profile?.['vcard:photo']} className={classes.avatar} />
      <Grid container spacing={xs ? 2 : 2}>
        <Grid item xs={12} sm={8}>
          <div>
            <Typography variant="body1" className={classes.name} component="span">
              {profile?.['vcard:given-name']}
            </Typography>
            <Typography variant="subtitle1" component="span">
              {profile && formatUsername(profile.describes)}
            </Typography>
          </div>
          <Typography variant="body2">{message}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" alignItems="middle" justifyContent={xs ? 'flex-start' : 'flex-end'}>
            <Button variant="contained" color="primary" className={classes.button} onClick={() => accept(activity)}>
              {translate('app.action.accept')}
            </Button>
            {activity.context ? (
              <Button variant="contained" color="grey" className={classes.button} onClick={() => ignore(activity)}>
                {translate('app.action.ignore')}
              </Button>
            ) : (
              <Button variant="contained" color="grey" className={classes.button} onClick={() => reject(activity)}>
                {translate('app.action.reject')}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const ContactRequestsBlock = () => {
  const classes = useStyles();
  const outbox = useOutbox();
  const notify = useNotify();
  const refresh = useRefresh();
  const translate = useTranslate();
  let { items: contactRequests, removeItem } = useCollection('apods:contactRequests');

  const accept = useCallback(
    async (activity) => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.ACCEPT,
          actor: outbox.owner,
          object: activity.id,
          to: activity.actor,
        });
        notify('app.notification.contact_request_accepted');
        removeItem(activity.id);
        setTimeout(refresh, 3000);
      } catch (e) {
        notify(e.message, 'error');
      }
    },
    [outbox, refresh, notify, removeItem]
  );

  const reject = useCallback(
    async (activity) => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.REJECT,
          actor: outbox.owner,
          object: activity.id,
          to: activity.actor,
        });
        notify('app.notification.contact_request_rejected');
        removeItem(activity.id);
        setTimeout(refresh, 3000);
      } catch (e) {
        notify(e.message, 'error');
      }
    },
    [outbox, refresh, notify, removeItem]
  );

  const ignore = useCallback(
    async (activity) => {
      try {
        await outbox.post({
          type: ACTIVITY_TYPES.IGNORE,
          actor: outbox.owner,
          object: activity.id,
          to: activity.actor,
        });
        notify('app.notification.contact_request_ignored');
        removeItem(activity.id);
        setTimeout(refresh, 3000);
      } catch (e) {
        notify(e.message, 'error');
      }
    },
    [outbox, refresh, notify, removeItem]
  );

  if (contactRequests.length === 0) return null;

  return (
    <Card className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="body2">{translate('app.block.contact_requests')}</Typography>
      </Box>
      {contactRequests.map((activity) => (
        <Box className={classes.list}>
          <ContactRequest activity={activity} accept={accept} reject={reject} ignore={ignore} />
        </Box>
      ))}
    </Card>
  );
};

export default ContactRequestsBlock;
