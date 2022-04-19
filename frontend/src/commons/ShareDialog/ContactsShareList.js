import React from 'react';
import { List, makeStyles, Box, CircularProgress } from '@material-ui/core';
import ContactItem from './ContactItem';
import { useListContext, useTranslate } from 'react-admin';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ContactsShareList = ({ addInvitation, removeInvitation, announces, announcers, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const { ids, data, loading, ...rest } = useListContext();
  return (
    <List dense className={classes.list}>
      {ids.map((id, i) => (
        <ContactItem
          key={i}
          record={data[id]}
          addInvitation={addInvitation}
          removeInvitation={removeInvitation}
          canView={announces.includes(data[id].describes)}
          canShare={announcers.includes(data[id].describes)}
          isOrganizer={isOrganizer}
          {...rest}
        />
      ))}
      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center" height={250}>
          <CircularProgress size={60} thickness={6} />
        </Box>
      )}
      {!loading && ids.length === 0 && <Alert severity="warning">{translate('app.helper.no_contact')}</Alert>}
    </List>
  );
};

export default ContactsShareList;
