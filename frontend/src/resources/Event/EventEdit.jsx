import React from 'react';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import Edit from '../../layout/Edit';
import EditTitle from './EventTitle';

const EventEdit = () => {
  const { identity } = useCheckAuthenticated();
  if (!identity?.id) return null;
  return (
    <Edit redirect="show" title={<EditTitle />}>
      <EventForm />
    </Edit>
  );
};

export default EventEdit;
