import React from 'react';
import { ListButton, useCreateContext } from 'react-admin';
import { Box, Typography, Container, Grid, Card, useMediaQuery } from '@mui/material';

const CreateView = ({ actions, title, children }) => {
  const { defaultTitle } = useCreateContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  return (
    <Container disableGutters={xs}>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1">
            {title || defaultTitle}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="middle" justifyContent="right">
            {actions.map((action, i) => React.cloneElement(action, { color: 'black', key: i }))}
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Card>{children}</Card>
      </Box>
    </Container>
  );
};

CreateView.defaultProps = {
  actions: [<ListButton />]
};

export default CreateView;
