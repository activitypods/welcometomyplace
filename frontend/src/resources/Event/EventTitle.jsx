import React from 'react';
import { useRecordContext } from 'react-admin';

const EventTitle = () => {
  const record = useRecordContext();
  return <span>{record?.name}</span>;
};

export default EventTitle;
