import React from 'react';
import { CreateBase, useQueryWithStore, Loading, useTranslate } from 'react-admin';
import EventForm from './EventForm';
import Alert from '@material-ui/lab/Alert';
import CreatePage from '../../layout/CreatePage';

const EventCreate = (props) => {
  const { loading, data: locations } = useQueryWithStore({ type: 'getList', resource: 'Location' });
  const translate = useTranslate();
  return loading ? (
    <Loading />
  ) : locations.length === 0 ? (
    <Alert severity="error">{translate('app.helper.no_address')}</Alert>
  ) : (
    <CreateBase {...props}>
      <CreatePage title={translate('app.action.create_event')}>
        <EventForm />
      </CreatePage>
    </CreateBase>
  );
};

export default EventCreate;
