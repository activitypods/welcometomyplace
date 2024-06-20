import React, { useState, useCallback } from 'react';
import { SimpleForm, ImageField, TextInput, required, NumberInput, SelectInput, useTranslate } from 'react-admin';
import { Box, Alert } from '@mui/material';
import { MarkdownInput } from '@semapps/markdown-components';
import { ReferenceInput, ImageInput } from '@semapps/input-components';
import BodyLabel from '../../commons/lists/BodyList/BodyLabel';
import QuickCreateLocationInput from "../../commons/inputs/QuickCreateLocationInput/QuickCreateLocationInput";
import DateTimeInput from '../../commons/inputs/DateTimeInput';

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

const EventForm = () => {
  const translate = useTranslate();

  // Needed to trigger orm change and enable save button :
  // https://codesandbox.io/s/react-admin-v3-advanced-recipes-quick-createpreview-voyci
  const [locationVersion, setLocationVersion] = useState(0);
  const handleLocationChange = useCallback(() => {
    setLocationVersion(locationVersion + 1);
  }, [locationVersion]);

  return (
    <>
      {process.env.REACT_APP_LANG === 'fr' &&
      <Box m={2} mb={1}>
        <Alert severity="info">
          {translate('app.helper.first_event')}&nbsp;
          <a href={`https://forum.reseauxdevie.org`} target="_blank" rel="noopener noreferrer">{translate('app.forum_name')}</a>
        </Alert>
      </Box>
      }
      <SimpleForm>
        <TextInput source="name" fullWidth validate={[required()]} />
        <DateTimeInput
          source="startTime"
          validate={[required(), futureDate]}
        />
        <DateTimeInput
          source="endTime"
          validate={[required(), afterStartTime]}
        />
        <QuickCreateLocationInput
          key={locationVersion}
          reference="Location"
          source="location"
          onChange={handleLocationChange}
        />
        <ImageInput source="image" accept="image/*">
          <ImageField source="src" />
        </ImageInput>
        <MarkdownInput source="content" fullWidth validate={[required()]} isRequired />
        <ReferenceInput
          reference="Format"
          source="apods:hasFormat"
          filter={{ a: 'apods:EventFormat' }}
          sort={{ field: 'rdfs:label', order: 'ASC' }}
        >
          <SelectInput optionText="rdfs:label" validate={[required()]} fullWidth />
        </ReferenceInput>
        <BodyLabel>{translate('app.input.conditions')}</BodyLabel>
        <DateTimeInput
          source="apods:closingTime"
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
