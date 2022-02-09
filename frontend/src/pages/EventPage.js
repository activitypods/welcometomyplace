import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useGetIdentity, useNotify } from 'react-admin';

const InvitePage = () => {
  const params = useParams();
  const { identity, loading } = useGetIdentity();
  const notify = useNotify();

  if (loading) return null;

  const redirectUrl = '/Event/' + encodeURIComponent(params.id) + '/show';

  if (identity?.id) {
    return <Redirect to={redirectUrl} />;
  } else {
    notify('app.notification.login_to_view_event');
    return <Redirect to={'/login?redirect=' + encodeURIComponent(redirectUrl)} />;
  }
};

export default InvitePage;
