import React from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { MapField } from '@semapps/geo-components';
import { ReferenceField } from '@semapps/field-components';
import { useRecordContext, useTranslate } from 'react-admin';

const HostLocationField = ({ label, source, ...rest }) => {
  const record = useRecordContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  const translate = useTranslate();
  return (
    <ReferenceField reference="Location" record={record} source={source} link={false}>
      <MapField
        address={(record) => (
          <>
            {record?.['vcard:given-name'] + ', ' + record?.['vcard:hasAddress']?.['vcard:given-name']}
            {record?.['vcard:note'] && (
              <Box mb={2} mt={2}>
                <Alert severity="info">
                  <strong>{translate('resources.Location.fields.vcard:note')}</strong>: {record?.['vcard:note']}
                </Alert>
              </Box>
            )}
          </>
        )}
        latitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:latitude']}
        longitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:longitude']}
        height={xs ? 250 : 400}
      />
    </ReferenceField>
  );
};

HostLocationField.defaultProps = {
  addLabel: true,
  label: 'Localisation',
  source: 'location',
};

export default HostLocationField;
