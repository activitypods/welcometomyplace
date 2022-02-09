import React from 'react';
import { useShowContext, useGetIdentity } from 'react-admin';
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useCollection } from '@semapps/activitypub-components';

const EventAlert = ({ onShare }) => {
  const { record } = useShowContext();
  const { identity } = useGetIdentity();
  const { items: invitees } = useCollection(record?.['apods:invitees']);
  const { items: inviters } = useCollection(record?.['apods:inviters']);
  const { items: attendees } = useCollection(record?.['apods:attendees']);

  if (!record || !identity?.id) return null;

  let message;

  if (record?.['dc:creator'] === identity?.id) {
    if (invitees.length === 0) {
      message = (
        <>
          Cet événement n'est actuellement visible que par vous. Dès que vous serez satisfait de sa présentation, vous
          pourrez <a onClick={onShare}>le partager</a> avec vos contacts.
        </>
      );
    }
  } else {
    const status = Array.isArray(record?.['apods:hasStatus'])
      ? record?.['apods:hasStatus']
      : [record?.['apods:hasStatus']];
    if (!attendees.includes(identity?.id) && !status.includes('apods:Closed')) {
      message = (
        <>
          Vous avez été invité à cet événement. Pour accepter l'invitation, veuillez cliquer sur le bouton "Je
          m'inscris".
        </>
      );
    } else if (inviters.includes(identity?.id)) {
      message = (
        <>
          L'organisateur vous a donné le droit de <a onClick={onShare}>partager cet événement</a> avec vos contacts.
        </>
      );
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
