import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles, Avatar, Switch, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
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

const AllContactItem = ({ records, setRecords, addInvitation, removeInvitation, isOrganizer }) => {
  const classes = useStyles();
  const translate = useTranslate();

  const [viewChecked, setViewChecked] = useState(false);
  const [shareChecked, setShareChecked] = useState(false);

  const viewSwitchReadonly = useMemo(
    () => records.every(record => record.viewSwitchReadonly),
    [records]
  )
  const shareSwitchReadonly = useMemo(
    () => records.every(record => record.shareSwitchReadonly),
    [records]
  )

  React.useEffect(() => {
    const toggleView = records
      .filter(record => !record.viewSwitchReadonly)
      .some(record => record.canViewEvent)
    const toggleShare = records
      .filter(record => !record.shareSwitchReadonly)
      .some(record => record.canShareEvent)

    setViewChecked(toggleView)
    setShareChecked(toggleShare)
  }, [records, setViewChecked, setShareChecked])

  const switchView = useCallback(() => {
    if (!viewChecked) {
      setViewChecked(true);
      const newRecords = records.map((record) => {
        if (record.viewSwitchReadonly) {
          return record;
        }

        addInvitation(record.describes, ['view']);
        return { ...record, canViewEvent: true }
      })
      setRecords(newRecords)
    } else {
      setViewChecked(false);
      setShareChecked(false);
      const newRecords = records.map((record) => {
        if (record.viewSwitchReadonly) {
          return record
        }

        removeInvitation(record.describes);
        return { ...record, canViewEvent: false }
      })
      setRecords(newRecords)
    }
  }, [
    records,
    setRecords,
    addInvitation,
    removeInvitation,
    viewChecked,
    setViewChecked,
    setShareChecked
  ]);

  const switchShare = useCallback(() => {
    if (!shareChecked) {
      setShareChecked(true);

      const newRecords = records.map((record) => {
        if (record.shareSwitchReadonly) {
          return record;
        }

        if (record.canViewEvent) {
          addInvitation(record.describes, ['share']);
          return { ...record, canShareEvent: true }
        }
        else {
          setViewChecked(true);
          addInvitation(record.describes, ['view', 'share']);
          return { ...record, canViewEvent: true, canShareEvent: true }
        }
      })
      setRecords(newRecords)
    } else {
      setShareChecked(false);

      const newRecords = records.map((record) => {
        if (record.shareSwitchReadonly) {
          return record;
        }
        if (record.canViewEvent) {
          removeInvitation(record.describes);
          return { ...record, canShareEvent: false }
        } else {
          addInvitation(record.describes, ['view']);
          return { ...record, canViewEvent: true, canShareEvent: false }
        }
      })
      setRecords(newRecords)
    }
  }, [
    records,
    setRecords,
    addInvitation,
    removeInvitation,
    shareChecked,
    setViewChecked,
    setShareChecked
  ]);

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={classes.avatarItem}>
        <Avatar className={classes.avatar}>
          C
        </Avatar>

      </ListItemAvatar>
      <ListItemText
        className={classes.primaryText}
        primary={translate('app.share.all_contacts')}
      />
      <ListItemText
        className={classes.secondaryText}
        primary={translate('app.share.allow_view')}
        secondary={
          <Switch size="small" checked={viewChecked} disabled={viewSwitchReadonly} onChange={switchView} />
        }
      />
      {isOrganizer && (
        <ListItemText
          className={classes.secondaryText}
          primary={translate('app.share.allow_share')}
          secondary={<Switch size="small" checked={shareChecked} disabled={shareSwitchReadonly} onChange={switchShare} />}
        />
      )}
    </ListItem>
  );
};

export default AllContactItem;
