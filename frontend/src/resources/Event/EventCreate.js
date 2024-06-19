import React from 'react';
import { useTranslate, useNotify, useRedirect } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import Create from '../../layout/Create';
import useWaitForPredicates from '../../hooks/useWaitForPredicates';

const EventCreate = () => {
  useCheckAuthenticated();
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();
  const waitForPredicates = useWaitForPredicates();

  const onSuccess = async data => {
    data = await waitForPredicates('Event', data, ['apods:attendees', 'apods:hasStatus', 'dc:created', 'dc:creator', 'dc:modified']);
    notify('ra.notification.created', { messageArgs: { smart_count: 1 } });
    redirect('show', 'Event', data.id, data);
  };

  return (
    <Create redirect="show" mutationOptions={{ onSuccess }} title={translate('app.action.create_event')}>
      <EventForm />
    </Create>
  );
};

export default EventCreate;
