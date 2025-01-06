import React from 'react';
import { useGetList, useTranslate, RecordContextProvider } from 'react-admin';
import { Box, Container, Typography, Grid } from '@mui/material';
import FormatCard from '../../resources/Format/FormatCard';

const FeaturedFormats = () => {
  const translate = useTranslate();
  const { data } = useGetList('Format');
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography
          align="center"
          sx={{ fontSize: { xs: 30, sm: 50 }, fontFamily: 'Chewy', color: 'orange', height: 70 }}
        >
          Des idées de rencontres
        </Typography>
        <Grid container spacing={3}>
          {data?.map(record => (
            <RecordContextProvider value={record} key={record.id}>
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

export default FeaturedFormats;
