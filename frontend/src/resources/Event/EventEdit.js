import React from 'react';
import { EditBase, useCreatePath, useGetRecordId, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import EditPage from '../../layout/EditPage';
import EditTitle from './EventTitle';

const EventEdit = () => {
  const recordId = useGetRecordId();
  const { identity } = useCheckAuthenticated();
  const translate = useTranslate();
  const createPath = useCreatePath();
  if (!identity?.id) return null;
  return (
    <EditBase redirect="show">
      <EditPage
        title={<EditTitle />}
        actions={{ [createPath({ resource: 'Event', type: 'show', id: recordId })]: translate('ra.action.show')}}
      >
        <EventForm />
      </EditPage>
    </EditBase>
  );
};

export default EventEdit;
