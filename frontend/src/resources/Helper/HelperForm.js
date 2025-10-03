import React, { useCallback } from 'react';
import {
  SimpleForm,
  TextInput,
  required,
  useTranslate,
  BooleanInput,
  FormDataConsumer,
  SelectInput,
  CheckboxGroupInput
} from 'react-admin';
import { LocationInput, extractContext } from '@semapps/geo-components';
import { ReferenceArrayInput } from '@semapps/input-components';

const HelperForm = () => {
  const translate = useTranslate();

  return (
    <SimpleForm>
      <ReferenceArrayInput reference="Format" source="apods:eventFormat">
        <CheckboxGroupInput row={false} />
      </ReferenceArrayInput>
      <BooleanInput source="apods:availableForCall" />
      <BooleanInput source="apods:availableForFacilitation" />
      <FormDataConsumer>
        {({ formData, ...rest }) =>
          formData['apods:availableForFacilitation'] && (
            <>
              <LocationInput
                mapboxConfig={{
                  access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
                  types: ['place'],
                  country: ['fr', 'be', 'ch']
                }}
                source="location"
                parse={value => ({
                  type: 'Place',
                  name: `${value.text} (${extractContext(value.context, 'country')})`,
                  longitude: value.center[0],
                  latitude: value.center[1]
                })}
                optionText={resource => resource.name}
                // validate={[required()]}
                fullWidth
                {...rest}
              />
              <SelectInput
                source="radius"
                choices={[
                  { id: 10, name: '10km' },
                  { id: 20, name: '20km' },
                  { id: 30, name: '30km' },
                  { id: 50, name: '50km' },
                  { id: 100, name: '100km' }
                ]}
                fullWidth
                {...rest}
              />
            </>
          )
        }
      </FormDataConsumer>
      <TextInput source="description" multiline rows={3} fullWidth validate={[required()]} />
    </SimpleForm>
  );
};

export default HelperForm;
