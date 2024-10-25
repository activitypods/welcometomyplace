import React from 'react';
import { ListButton, ShowButton, useEditContext } from 'react-admin';
import { Box, Typography, Container, Grid, Card, useMediaQuery } from '@mui/material';

const EditView = ({ title, actions = [<ListButton />, <ShowButton />], children }) => {
  const { defaultTitle } = useEditContext();
  const xs = useMediaQuery(theme => theme.breakpoints.down('sm'), { noSsr: true });
  return (
    <Container disableGutters={xs}>
      <Grid container sx={{ mt: 2, px: { xs: 2, sm: 0 } }}>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1" sx={{ lineHeight: '1.2 !important' }}>
            {title || defaultTitle}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" alignItems="middle" justifyContent="right">
            {actions?.map((action, key) => React.cloneElement(action, { key, color: 'black' }))}
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Card>{children}</Card>
      </Box>
    </Container>
  );
};

export default EditView;
