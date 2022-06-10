import React, { useCallback, useState, useEffect } from 'react';
import { makeStyles, Avatar, Switch, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { formatUsername } from '../../utils';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  primaryText: {
    width: '30%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexBasis: '100%',
  },
  secondaryText: {
    textAlign: 'center',
    width: '60%',
    fontStyle: 'italic',
    color: 'grey',
  },
  avatarItem: {
    minWidth: 50,
  },
  avatar: {
    backgroundImage: `radial-gradient(circle at 50% 3em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  },
}));

const ContactItem = ({ record, updateRecord, addInvitation, removeInvitation, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();

  const [viewChecked, setViewChecked] = useState(record.canViewEvent);
  const [shareChecked, setShareChecked] = useState(record.canShareEvent);

  useEffect(() => {
    setViewChecked(record.canViewEvent)
    setShareChecked(record.canShareEvent)
  }, [record])

  const switchView = useCallback(() => {
    if (!viewChecked) {
      setViewChecked(true);
      addInvitation(record.describes, ['view']);
      updateRecord({ ...record, canViewEvent: true })
    } else {
      setViewChecked(false);
      setShareChecked(false);
      removeInvitation(record.describes);
      updateRecord({ ...record, canViewEvent: false })
    }
  }, [addInvitation, updateRecord, removeInvitation, record, viewChecked, setViewChecked, setShareChecked]);

  const switchShare = useCallback(() => {
    if (!shareChecked) {
      setShareChecked(true);
      // If user can already view, we only add a share right
      if (record.canViewEvent) {
        addInvitation(record.describes, ['share']);
        updateRecord({ ...record, canShareEvent: true })
      } else {
        setViewChecked(true);
        addInvitation(record.describes, ['view', 'share']);
        updateRecord({ ...record, canViewEvent: true, canShareEvent: true })
      }
    } else {
      setShareChecked(false);
      if (record.canViewEvent) {
        removeInvitation(record.describes);
        updateRecord({ ...record, canShareEvent: false })
      } else {
        addInvitation(record.describes, ['view']);
        updateRecord({ ...record, canViewEvent: true, canShareEvent: false })
      }
    }
  }, [
    record,
    updateRecord,
    addInvitation,
    removeInvitation,
    shareChecked,
    setViewChecked,
    setShareChecked
  ]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar src={record?.['vcard:photo']} className={classes.avatar}>
          {record['vcard:given-name']?.[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary={record['vcard:given-name']}
        secondary={formatUsername(record.describes)}
      />
      <ListItemText
        className={classes.secondaryText}
        primary={translate('app.permission.view')}
        secondary={<Switch size="small" checked={viewChecked} disabled={record.viewSwitchReadonly} onChange={switchView} />}
      />
      {isOrganizer && (
        <ListItemText
          className={classes.secondaryText}
          primary={translate('app.permission.share')}
          secondary={<Switch size="small" checked={shareChecked} disabled={record.shareSwitchReadonly} onChange={switchShare} />}
        />
      )}
    </ListItem>
  );
};

export default ContactItem;
