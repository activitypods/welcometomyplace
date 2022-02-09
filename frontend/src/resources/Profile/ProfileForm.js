import React from 'react';
import { ImageInput, TextInput, SimpleForm, useTranslate } from 'react-admin';
import { ImageField } from '@semapps/semantic-data-provider';
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const ProfileForm = (props) => {
  const translate = useTranslate();
  return (
    <SimpleForm {...props}>
      <Box mb={2} fullWidth>
        <Alert severity="info">{translate('app.helper.profile_visibility')}</Alert>
      </Box>
      <TextInput source="vcard:given-name" fullWidth />
      <TextInput source="vcard:note" fullWidth />
      <ImageInput source="vcard:photo" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
    </SimpleForm>
  );
};

export default ProfileForm;
