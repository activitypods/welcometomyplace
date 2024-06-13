import React from 'react';
import { CreateBase, useTranslate, useNotify, useRedirect } from 'react-admin';
import EventForm from './EventForm';
import CreatePage from '../../layout/CreatePage';
import useWaitForPredicates from '../../hooks/useWaitForPredicates';

const EventCreate = () => {
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
    <CreateBase redirect="show" mutationOptions={{ onSuccess }}>
      <CreatePage title={translate('app.action.create_event')}>
        <EventForm />
      </CreatePage>
    </CreateBase>
  );
};

export default EventCreate;
