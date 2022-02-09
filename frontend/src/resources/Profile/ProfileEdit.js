import React from 'react';
import { EditBase, useTranslate } from 'react-admin';
import EditPage from '../../layout/EditPage';
import ProfileForm from './ProfileForm';

export const ProfileEdit = (props) => {
  const translate = useTranslate();
  return (
    <EditBase {...props} transform={(data) => ({ ...data, 'vcard:fn': data['vcard:given-name'] })}>
      <EditPage title={translate('app.page.profile')} hasDelete={false}>
        <ProfileForm />
      </EditPage>
    </EditBase>
  );
};

export default ProfileEdit;
