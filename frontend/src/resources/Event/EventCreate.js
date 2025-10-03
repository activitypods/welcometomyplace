import React, { useState } from 'react';
import { useTranslate, useNotify, useRedirect, Loading } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import Create from '../../layout/Create';
import useWaitForPredicates from '../../hooks/useWaitForPredicates';

const EventCreate = () => {
  useCheckAuthenticated();
  const [isLoading, setIsLoading] = useState(false);
  const translate = useTranslate();
  const notify = useNotify();
  const redirect = useRedirect();
  const waitForPredicates = useWaitForPredicates();

  const onSuccess = async data => {
    setIsLoading(true);
    data = await waitForPredicates('Event', data, [
      'apods:attendees',
      'apods:hasStatus',
      'dc:created',
      'dc:creator',
      'dc:modified'
    ]);
    notify('ra.notification.created', { messageArgs: { smart_count: 1 } });
    redirect('show', 'Event', data.id, data);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading loadingPrimary="app.message.event_creation" sx={{ height: '50vh' }} />;
  } else {
    return (
      <Create redirect="show" mutationOptions={{ onSuccess }} title={translate('app.action.create_event')}>
        <EventForm />
      </Create>
    );
  }
};

export default EventCreate;
