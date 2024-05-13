import React from 'react';
import { EditBase, useCreatePath, useEditContext, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import EditPage from '../../layout/EditPage';
import EditTitle from './EventTitle';

const EventEdit = () => {
  const { resource, record } = useEditContext();
  const { identity } = useCheckAuthenticated();
  const translate = useTranslate();
  const createPath = useCreatePath();
  if (!identity?.id) return null;
  return (
    <EditBase redirect="show">
      <EditPage
        title={<EditTitle />}
        actions={{ [createPath({ resource, type: 'show', id: record?.id })]: translate('ra.action.show')}}
      >
        <EventForm />
      </EditPage>
    </EditBase>
  );
};

export default EventEdit;
