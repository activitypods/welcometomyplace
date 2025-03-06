import React from 'react';
import { Link, useCreatePath, useRecordContext } from 'react-admin';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const FormatCard = () => {
  const record = useRecordContext();
  const createPath = useCreatePath();

  return (
    <Link to={createPath({ resource: 'Format', id: record.id, type: 'show' })}>
      <Card sx={{ boxShadow: 0, borderRadius: 0 }}>
        <CardMedia sx={{ height: 140 }} image={record.image} title={record.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {record.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.2em',
              height: '3.6em'
            }}
          >
            {record.summary}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FormatCard;
