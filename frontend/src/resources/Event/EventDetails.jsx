import React from 'react';
import { DateField, TextField, useTranslate } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import IconsList from '../../commons/lists/IconsList';
import DurationField from '../../commons/fields/DurationField';
import FaceIcon from '@mui/icons-material/Face';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';

const EventDetails = ({ orientation }) => {
  const translate = useTranslate();
  return (
    <IconsList orientation={orientation}>
      <ReferenceField reference="Actor" source="dc:creator" icon={<FaceIcon />} link={false}>
        <ReferenceField reference="Profile" source="url">
          <TextField source="vcard:given-name" />
        </ReferenceField>
      </ReferenceField>
      <DateField
        showTime
        label={translate('app.input.date')}
        source="startTime"
        options={{ weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }}
        icon={<EventIcon />}
      />
      <DurationField
        label={translate('app.input.duration')}
        source="startTime"
        startDate="startTime"
        endDate="endTime"
        icon={<ScheduleIcon />}
      />
    </IconsList>
  );
};

export default EventDetails;
