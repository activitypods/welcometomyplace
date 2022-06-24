import React from 'react';
import { ListBase, useRecordContext, useTranslate } from 'react-admin';
import CardsList from "../lists/CardsList";
import EventCard from "../../resources/Event/EventCard";
import Alert from "@material-ui/lab/Alert";
import {Box} from "@material-ui/core";

const OrganizedEventsField = ({ source }) => {
  const record = useRecordContext();
  const translate = useTranslate();
  if( !record ) return null;
  return(
    <>
      <Box mb={1}>
        <Alert severity="info">{translate('app.helper.organized_events_visibility', { username: record?.['vcard:given-name']})}</Alert>
      </Box>
      <ListBase
        resource="Event"
        basePath="/Event"
        filterDefaultValues={{ 'dc:creator': record?.[source] }}
        sort={{ field: 'startTime', order: 'DESC' }}
        perPage={1000}
      >
        <CardsList CardComponent={EventCard} link="show" />
      </ListBase>
    </>
  )
};

OrganizedEventsField.defaultProps = {
  addLabel: true,
};

export default OrganizedEventsField;
