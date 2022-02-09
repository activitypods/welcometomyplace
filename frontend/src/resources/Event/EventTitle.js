import React from 'react';

const EventTitle = ({ record }) => {
  return <span>{record?.name}</span>;
};

export default EventTitle;
