import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useQueryWithStore, useTranslate } from 'react-admin';

const DomainSelectInput = ({
  input: { name, value, onChange, ...restInput },
  meta,
  label,
  formControlProps,
  ...rest
}) => {
  const { data, loading } = useQueryWithStore({
    type: 'getList',
    resource: 'PodProvider',
  });
  const translate = useTranslate();

  // Set first item as default value
  if (!value && !loading) onChange(data?.[0]?.['apods:domainName']);

  return (
    <FormControl {...formControlProps} style={{ minWidth: '100%' }}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select {...rest} name={name} onChange={onChange} inputProps={restInput} value={value}>
        {!loading ? (
          data &&
          data.map((podProvider) => (
            <MenuItem key={podProvider.id} value={podProvider['apods:domainName']}>
              {`${podProvider['apods:domainName']} (${podProvider['apods:area']})`}
            </MenuItem>
          ))
        ) : (
          <MenuItem>{translate('ra.page.loading')}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default DomainSelectInput;
