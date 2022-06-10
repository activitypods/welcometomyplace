import React, { useEffect } from 'react';
import { List, makeStyles, Box, CircularProgress } from '@material-ui/core';
import ContactItem from './ContactItem';
import AllContactsItem from './AllContactsItem';
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

const ContactsShareList = ({ addInvitation, removeInvitation, announces, announcers, isOrganizer, newInvitations }) => {
  const classes = useStyles();
  const translate = useTranslate();
  const { ids, data, loading, ...rest } = useListContext();

  const [records, setRecords] = React.useState([]);

  useEffect(() => {
    setRecords(ids.reduce((acc, id) => {
      const viewSwitchReadonly = announces.includes(data[id].describes)
      const shareSwitchReadonly = announcers.includes(data[id].describes)
      return [...acc, {
        ...data[id],
        viewSwitchReadonly,
        shareSwitchReadonly,
        canViewEvent: announces.includes(data[id].describes),
        canShareEvent: announcers.includes(data[id].describes),
      }]
    }, []))
  }, [
    ids, data, announcers, announces
  ])

  const updateRecord = React.useCallback((record) => {
    const newRecords = records.map((item) => {
      if (item.id === record.id) {
        return { ...record }
      }
      return item
    })
    setRecords(newRecords)
  }, [records, setRecords])

  return (
    <List dense className={classes.list}>
      {isOrganizer && (
        <AllContactsItem
          records={records}
          addInvitation={addInvitation}
          removeInvitation={removeInvitation}
          isOrganizer={isOrganizer}
          setRecords={setRecords}
        />)
      }
      {records.map((record) => (
        <ContactItem
          key={record.describes}
          record={record}
          addInvitation={addInvitation}
          removeInvitation={removeInvitation}
          updateRecord={updateRecord}
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
