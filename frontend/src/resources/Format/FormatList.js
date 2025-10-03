import React from 'react';
import { ListBase, RecordContextProvider, useListContext } from 'react-admin';
import { Box, Container, Grid, Typography } from '@mui/material';
import FormatCard from './FormatCard';

const FormatListView = () => {
  const { data } = useListContext();
  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Typography variant="h2">Tous les formats d'événements</Typography>
        <Grid container spacing={3}>
          {data?.map(record => (
            <RecordContextProvider value={record}>
              <Grid item xs={4}>
                <FormatCard />
              </Grid>
            </RecordContextProvider>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const FormatList = () => (
  <ListBase disableAuthentication>
    <FormatListView />
  </ListBase>
);

export default FormatList;
