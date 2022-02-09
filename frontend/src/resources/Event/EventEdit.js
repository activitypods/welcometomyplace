import React from 'react';
import { EditBase, linkToRecord, useTranslate } from 'react-admin';
import { Button } from '@material-ui/core';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import EventForm from './EventForm';
import EditPage from '../../layout/EditPage';
import EditTitle from './EventTitle';

const EventEdit = (props) => {
  const { identity } = useCheckAuthenticated();
  const translate = useTranslate();
  if (!identity?.id) return null;
  return (
    <EditBase redirect="show" {...props}>
      <EditPage
        title={<EditTitle />}
        actions={[<Button to={linkToRecord('/Event', props.id, 'show')}>{translate('ra.action.show')}</Button>]}
      >
        <EventForm />
      </EditPage>
    </EditBase>
  );
};

export default EventEdit;
