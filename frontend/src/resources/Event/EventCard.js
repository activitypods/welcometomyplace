import React from 'react';
import { DateField, TextField } from 'react-admin';
import Chip from '../../commons/Chip';
import { ReferenceField } from '@semapps/field-components';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EventIcon from '@mui/icons-material/Event';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FaceIcon from '@mui/icons-material/Face';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.8
    // color: theme.palette.primary.main,
  },
  description: {
    marginTop: 10,
    fontSize: '14px',
    '& span': {
      fontSize: '14px'
    },
    display: 'block',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: '3.6em'
  }
}));

const EventCard = () => {
  const classes = useStyles();
  return (
    <>
      <TextField variant="h2" color="primary" source="name" className={classes.title} />
      <Box pb={1}>
        <Chip icon={<EventIcon />}>
          <DateField
            source="startTime"
            options={{ weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }}
            showTime
          />
        </Chip>
        <Chip icon={<FaceIcon />}>
          <ReferenceField reference="Actor" source="dc:creator" link={false}>
            <ReferenceField reference="Profile" source="url" link={false}>
              <TextField source="vcard:given-name" />
            </ReferenceField>
          </ReferenceField>
        </Chip>
        <Chip icon={<StarBorderIcon />}>
          <ReferenceField reference="Format" source="apods:hasFormat" link={false}>
            <TextField source="rdfs:label" />
          </ReferenceField>
        </Chip>
      </Box>
      <TextField source="content" className={classes.description} />
    </>
  );
};

export default EventCard;
