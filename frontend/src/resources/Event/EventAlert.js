import React from 'react';
import { useShowContext, useGetIdentity, useTranslate } from 'react-admin';
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useCollection } from '@semapps/activitypub-components';

const EventAlert = () => {
  const translate = useTranslate();
  const { record } = useShowContext();
  const { identity } = useGetIdentity();
  const { items: announces, loading } = useCollection(record?.['apods:announces']);
  const { items: announcers } = useCollection(record?.['apods:announcers']);
  const { items: attendees } = useCollection(record?.['apods:attendees']);

  if (!record || !identity?.id || loading) return null;

  let message;

  if (record?.['dc:creator'] === identity?.id) {
    if (announces.length === 0) {
      message = translate('app.helper.event_draft_mode');
    }
  } else {
    const status = Array.isArray(record?.['apods:hasStatus'])
      ? record?.['apods:hasStatus']
      : [record?.['apods:hasStatus']];
    if (!attendees.includes(identity?.id) && !status.includes('apods:Closed')) {
      message = translate('app.helper.event_join_right');
    } else if (announcers.includes(identity?.id)) {
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
