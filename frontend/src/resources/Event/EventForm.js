import React from 'react';
import { SimpleForm, ImageInput, TextInput, required, NumberInput, SelectInput, useTranslate } from 'react-admin';
import { Box } from '@material-ui/core';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageField } from '@semapps/field-components';
import { ReferenceInput } from '@semapps/input-components';
import { DateTimeInput } from '@semapps/date-components';
import frLocale from 'date-fns/locale/fr';
import BodyLabel from '../../commons/lists/BodyList/BodyLabel';
import Alert from '@material-ui/lab/Alert';

const futureDate = (value) => {
  if( value && value <= (new Date()) ) {
    return 'app.validation.futureDate';
  }
};

const afterStartTime = (value, allValues) => {
  if( allValues.startTime && value <= allValues.startTime ) {
    return 'app.validation.afterStartTime';
  }
};

const beforeStartTime = (value, allValues) => {
  if( allValues.startTime && value >= allValues.startTime ) {
    return 'app.validation.beforeStartTime';
  }
};

const EventForm = ({ className, ...rest }) => {
  const translate = useTranslate();
  return (
    <>
      <Box mb={1}>
        <Alert severity="info">
          {translate('app.helper.first_event')}
          <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>{process.env.REACT_APP_CONTACT_EMAIL}</a>
        </Alert>
      </Box>
      <SimpleForm {...rest} redirect="show">
        <TextInput source="name" fullWidth validate={[required()]} />
        <DateTimeInput
          source="startTime"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false,
          }}
          providerOptions={{
            locale: frLocale,
          }}
          fullWidth
          validate={[required(), futureDate]}
        />
        <DateTimeInput
          source="endTime"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false,
          }}
          providerOptions={{
            locale: frLocale,
          }}
          fullWidth
          validate={[required(), afterStartTime]}
        />
        <ReferenceInput reference="Location" source="location" fullWidth validate={[required()]}>
          <SelectInput optionText="vcard:given-name" />
        </ReferenceInput>
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <MarkdownInput source="content" fullWidth validate={[required()]} isRequired />
        <ReferenceInput
          reference="Format"
          source="apods:hasFormat"
          filter={{ a: 'apods:EventFormat' }}
          sort={{ field: 'rdfs:label', order: 'ASC' }}
          validate={[required()]}
        >
          <SelectInput optionText="rdfs:label" />
        </ReferenceInput>
        <BodyLabel>{translate('app.input.conditions')}</BodyLabel>
        <DateTimeInput
          source="apods:closingTime"
          options={{
            format: 'dd/MM/yyyy à HH:mm',
            ampm: false,
          }}
          providerOptions={{
            locale: frLocale,
          }}
          fullWidth
          validate={[beforeStartTime]}
        />
        <NumberInput source="apods:maxAttendees" fullWidth helperText={translate('app.helper.max_attendees')} />
        <TextInput
          source="apods:otherConditions"
          multiline
          resettable
          fullWidth
          helperText={translate('app.helper.other_conditions')}
        />
      </SimpleForm>
    </>
  );
};

export default EventForm;
