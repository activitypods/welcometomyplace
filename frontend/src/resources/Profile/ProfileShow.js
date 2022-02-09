import React from 'react';
import { ShowBase } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import ProfileHeader from './ProfileHeader';
import BodyList from '../../commons/lists/BodyList/BodyList';
import ContactField from '../../commons/fields/ContactField';

const ProfileShow = (props) => {
  useCheckAuthenticated();
  return (
    <ShowBase {...props}>
      <>
        <ProfileHeader />
        <BodyList>
          <ContactField source="describes" />
        </BodyList>
      </>
    </ShowBase>
  );
};

export default ProfileShow;
