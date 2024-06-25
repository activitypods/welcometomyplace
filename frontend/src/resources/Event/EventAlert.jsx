import React from 'react';
import { useShowContext, useGetIdentity, useTranslate } from 'react-admin';
import { Box, Alert } from '@mui/material';
import { useCollection } from '@semapps/activitypub-components';

const EventAlert = () => {
  const translate = useTranslate();
  const { record } = useShowContext();
  const { data: identity } = useGetIdentity();
  const { items: announces, isLoading } = useCollection(record?.['apods:announces']);
  const { items: announcers } = useCollection(record?.['apods:announcers']);
  const { items: attendees } = useCollection(record?.['apods:attendees']);

  if (!record || !identity?.id || isLoading) return null;

  let message;

  if (record?.['dc:creator'] === identity?.id) {
    // If there is only one invitee (the organizer)
    if (announces?.length === 1) {
      message = translate('app.helper.event_draft_mode');
    }
  } else {
    const status = Array.isArray(record?.['apods:hasStatus'])
      ? record?.['apods:hasStatus']
      : [record?.['apods:hasStatus']];
    if (attendees && !attendees.includes(identity?.id) && !status.includes('apods:Closed')) {
      message = translate('app.helper.event_join_right');
    } else if (announcers?.includes(identity?.id)) {
      message = translate('app.helper.event_share_right');
    }
  }

  if (message) {
    return (
      <Box>
        <Alert severity="info">{message}</Alert>
      </Box>
    );
  } else {
    return null;
  }
};

export default EventAlert;
