import React from 'react';
import { ShowBase, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import ProfileHeader from './ProfileHeader';
import BodyList from '../../commons/lists/BodyList/BodyList';
import ContactField from '../../commons/fields/ContactField';

const ProfileShow = (props) => {
  useCheckAuthenticated();
  const translate = useTranslate();
  return (
    <ShowBase {...props}>
      <>
        <ProfileHeader />
        <BodyList>
          <ContactField source="describes" label={translate('app.action.send_message')} />
        </BodyList>
      </>
    </ShowBase>
  );
};

export default ProfileShow;
