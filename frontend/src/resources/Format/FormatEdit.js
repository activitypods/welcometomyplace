import React from 'react';
import FormatForm from './FormatForm';
import Edit from '../../layout/Edit';

const FormatEdit = () => (
  <Edit redirect="show">
    <FormatForm />
  </Edit>
);

export default FormatEdit;
