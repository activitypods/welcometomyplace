import React from 'react';
import {List, makeStyles, Box, CircularProgress, useMediaQuery} from '@material-ui/core';
import ContactItem from './ContactItem';
import { useListContext, useTranslate } from 'react-admin';
import { FixedSizeList } from 'react-window';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    maxWidth: '100%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const ContactsShareList = ({ addInvitation, removeInvitation, announces, announcers, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const { ids, data, loading } = useListContext();

  return (
    <List dense className={classes.list}>
      <FixedSizeList height={300} itemSize={xs ? 76 : 60} itemCount={ids.length}>
        {({ index, style }) => (
          <ContactItem
            key={index}
            record={data[ids[index]]}
            addInvitation={addInvitation}
            removeInvitation={removeInvitation}
            canView={announces.includes(data[ids[index]].describes)}
            canShare={announcers.includes(data[ids[index]].describes)}
            isOrganizer={isOrganizer}
            style={style}
          />
        )}
      </FixedSizeList>
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
