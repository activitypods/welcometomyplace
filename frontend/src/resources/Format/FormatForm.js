import React from 'react';
import { SimpleForm, ImageField, TextInput, required, useTranslate } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';

const FormatForm = () => {
  const translate = useTranslate();

  return (
    <SimpleForm>
      <TextInput source="name" fullWidth validate={[required()]} />
      <TextInput source="summary" multiline rows={3} fullWidth validate={[required()]} />
      <ImageInput source="image" accept="image/*">
        <ImageField source="src" />
      </ImageInput>
      <MarkdownInput source="apods:recipe" fullWidth validate={[required()]} isRequired />
    </SimpleForm>
  );
};

export default FormatForm;
