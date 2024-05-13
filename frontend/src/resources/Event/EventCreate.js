import React from 'react';
import { CreateBase, useTranslate } from 'react-admin';
import EventForm from './EventForm';
import CreatePage from '../../layout/CreatePage';

const EventCreate = () => {
  const translate = useTranslate();
  return (
    <CreateBase>
      <CreatePage title={translate('app.action.create_event')}>
        <EventForm />
      </CreatePage>
    </CreateBase>
  );
};

export default EventCreate;
