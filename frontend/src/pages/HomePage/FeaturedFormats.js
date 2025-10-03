import React from 'react';
import { useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
// import FormatCard from '../../resources/Format/FormatCard';
import FormatExample from './FormatExample';

const FeaturedFormats = () => {
  const translate = useTranslate();
  // const { data } = useGetList('Format');
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography
          align="center"
          sx={{ fontSize: { xs: 40, sm: 50 }, fontFamily: 'Chewy', color: 'orange', height: 70 }}
        >
          {translate('app.homepage.events_ideas')}
        </Typography>
        <Grid container spacing={3}>
          {/* {data?.map(record => (
            <RecordContextProvider value={record} key={record.id}>
              <Grid item xs={4}>
                <FormatCard />
              </Grid>
            </RecordContextProvider>
          ))} */}
          <Grid item xs={12} sm={7}>
            <FormatExample
              name={translate('app.formats.open_table')}
              image="images/table-ouverte.png"
              backgroundPosition="bottom"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormatExample
              name={translate('app.formats.film_debate')}
              image="images/cine-echanges.png"
              backgroundPosition="bottom"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormatExample
              name={translate('app.formats.book_club')}
              image="images/cercle-de-lecture.png"
              backgroundPosition="bottom"
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormatExample name={translate('app.formats.talking_circle')} image="images/cercle-de-parole.png" />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 6, width: '100%', textAlign: 'center' }}>
          <Link to="/login?signup=true">
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 5, py: 2, borderRadius: 10, color: 'white', fontSize: 20, fontFamily: 'Chewy', mr: 2 }}
            >
              {translate('auth.action.signup')}
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 5, py: 2, borderRadius: 10, color: 'white', fontSize: 20, fontFamily: 'Chewy' }}
            >
              {translate('auth.action.login')}
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedFormats;
