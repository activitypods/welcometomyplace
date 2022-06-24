import React from 'react';
import { useRecordContext, useTranslate } from 'react-admin';
import { makeStyles, Box, Card, Typography } from '@material-ui/core';
import JoinButton from '../buttons/JoinButton';

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },
  block: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    textAlign: 'center',
  },
  status: {
    marginTop: 8,
    color: theme.palette.primary.main,
  },
}));

const EventJoinCard = ({ children }) => {
  const classes = useStyles();
  const record = useRecordContext();
  const translate = useTranslate();

  let statusMessage;
  const status = Array.isArray(record?.['apods:hasStatus'])
    ? record?.['apods:hasStatus']
    : [record?.['apods:hasStatus']];
  if (status.includes('apods:Closed')) {
    statusMessage = 'app.message.event_closed';
  } else if (status.includes('apods:Finished')) {
    statusMessage = 'app.message.event_finished';
  }

  return (
    <Card>
      <Box className={classes.title} p={2}>
        <Typography variant="h6">{record?.name}</Typography>
      </Box>
      <Box className={classes.block} p={3}>
        {children}
      </Box>
      <Box className={classes.button} pb={3} pr={3} pl={3}>
        <JoinButton variant="contained" color="primary" />
        {statusMessage && (
          <Typography variant="caption" className={classes.status} component="div">
            {translate(statusMessage)}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default EventJoinCard;
