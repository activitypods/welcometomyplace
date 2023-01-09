import React from 'react';
import { DateField, TextField } from 'react-admin';
import Chip from '../../commons/Chip';
import { ReferenceField } from '@semapps/field-components';
import { makeStyles, Box } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.8,
    // color: theme.palette.primary.main,
  },
  description: {
    marginTop: 10,
    fontSize: '14px',
    '& span': {
      fontSize: '14px',
    },
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '3.6em',
  },
}));

const EventCard = ({ record }) => {
  const classes = useStyles();
  return (
    <>
      <TextField variant="h2" color="primary" record={record} source="name" className={classes.title} />
      <Box pb={1}>
        <Chip icon={<EventIcon />}>
          <DateField
            record={record}
            source="startTime"
            options={{ weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }}
            showTime
          />
        </Chip>
        <Chip icon={<FaceIcon />}>
          <ReferenceField record={record} reference="Actor" source="dc:creator" link={false}>
            <ReferenceField reference="Profile" source="url" link={false}>
              <TextField source="vcard:given-name" />
            </ReferenceField>
          </ReferenceField>
        </Chip>
        <Chip icon={<StarBorderIcon />}>
          <ReferenceField record={record} reference="Format" source="apods:hasFormat" link={false}>
            <TextField source="rdfs:label" />
          </ReferenceField>
        </Chip>
      </Box>
      <TextField record={record} source="content" className={classes.description} />
    </>
  );
};

EventCard.defaultProps = {
  variant: 'full',
};

export default EventCard;
