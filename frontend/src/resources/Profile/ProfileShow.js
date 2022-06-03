import React from 'react';
import { ShowBase, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import ProfileHeader from './ProfileHeader';
import BodyList from '../../commons/lists/BodyList/BodyList';
import ContactField from '../../commons/fields/ContactField';
import G1AccountField from "../../commons/fields/G1AccountField";

const ProfileShow = (props) => {
  useCheckAuthenticated();
  const translate = useTranslate();
  return (
    <ShowBase {...props}>
      <>
        <ProfileHeader />
        <BodyList>
          <ContactField source="describes" label={translate('app.action.send_message')} />
          <G1AccountField source="foaf:tipjar" addLabel />
        </BodyList>
      </>
    </ShowBase>
  );
};

export default ProfileShow;
